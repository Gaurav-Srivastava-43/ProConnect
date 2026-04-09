import Media from '../models/Media.js';

export const fetchMedia = async (req,res) => {
    const media = await Media.findById(req.params.fileId);
    res.set('Content-Type', media.contentType);
    res.send(media.data);
}