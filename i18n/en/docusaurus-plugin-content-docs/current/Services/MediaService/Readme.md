# 🖼️ Media Service

**Port:** 3008  
**Status:** 🟡 In Development

The Media Service manages the upload, processing, and storage of media files (images, videos) in the CivicTwin system.

---

## Key Features

- **File upload**: Images and videos for incident reports
- **Image processing**: Resize, compress, generate thumbnails
- **Secure storage**: S3-compatible storage (AWS S3 / MinIO)
- **CDN delivery**: Fast content delivery via CDN
- **Metadata management**: EXIF, location, timestamps

---

## API Endpoints

```bash
# Upload media file
POST /api/media/upload
Content-Type: multipart/form-data
file: <binary>

Response:
{
  "mediaId": "media_xyz",
  "url": "https://cdn.civictwin.ai/media/xyz.jpg",
  "thumbnailUrl": "https://cdn.civictwin.ai/thumbs/xyz.jpg",
  "size": 245678,
  "type": "image/jpeg"
}

# Get media info
GET /api/media/{mediaId}

# Delete media
DELETE /api/media/{mediaId}
```

---

## Technology Stack

- **Runtime**: Node.js + Express
- **Storage**: AWS S3 / MinIO
- **Image Processing**: Sharp / Jimp
- **CDN**: CloudFront / nginx

---

## License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
