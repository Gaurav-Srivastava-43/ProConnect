import { getBucket } from '../index.js'
import mongoose from 'mongoose';

export const download = async (req, res) => {
  try {
    const { fileId } = req.params;
    //get the bucket
    const bucket = getBucket();
    
    //Check if bucket is initialized
    if (!bucket) {
        return res.status(500).send("Database connection not ready");
    }
    
    // Check if file exists
    const file = await bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // // set the headers
    // res.set("Content-Type", file[0].contentType);
    // res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);

    // // create a stream to read from the bucket
    // const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

    const range = req.headers.range;

    // If no range is requested (like an <img> tag), send the whole file normally
    if (!range) {
        res.set('Content-Type', file.contentType);
        res.set('Content-Length', file.length);
        return bucket.openDownloadStream(req.params.fileId).pipe(res);
    }

    // Parse Range header: "bytes=start-end"
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;
    const chunksize = (end - start) + 1;

    // Set Headers for Partial Content (206)
    res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${file.length}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': file.contentType,
    });

    // Open download stream for the specific byte range
    const downloadStream = bucket.openDownloadStream(req.params.fileId, {
        start: start,
        end: end + 1 // GridFS 'end' is exclusive
    });

    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: { text: `Unable to download file`, error }});
  }
};