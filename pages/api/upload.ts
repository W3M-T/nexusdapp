import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET
});

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        try {
            const imageUrl = req.body.url;
            if (!imageUrl) {
                res.status(400).json({ error: 'Image URL is required' });
                return;
            }
            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: true,
            };

            const result = await cloudinary.v2.uploader.upload(imageUrl, options);
            res.status(200).json({ url: result.secure_url });
        } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ error: 'Failed to upload image' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
