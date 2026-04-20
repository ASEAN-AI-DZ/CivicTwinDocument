# Media Service

## Giới thiệu

Media Service quản lý việc upload, lưu trữ, và phân phối các file media (hình ảnh, video, audio) trong hệ thống CityResQ360.

## Chức năng chính

### 1. Upload Media

- Upload hình ảnh
- Upload video
- Upload audio
- Upload file đính kèm

### 2. Xử lý Media

- Resize và optimize hình ảnh
- Tạo thumbnails
- Compress video
- Chuyển đổi format

### 3. Lưu trữ

- Cloud storage (AWS S3, Google Cloud Storage)
- CDN distribution
- Backup tự động

### 4. Streaming

- Video streaming
- Live streaming
- Adaptive bitrate

## Định dạng Hỗ trợ

### Hình ảnh

- JPEG, PNG, GIF, WebP
- SVG (vector)
- HEIC/HEIF

### Video

- MP4, WebM, MOV
- AVI, MKV
- Live streaming (HLS, DASH)

### Audio

- MP3, WAV, AAC
- OGG, FLAC

## Tích hợp

Service này tích hợp với:

- **IncidentService**: Lưu trữ hình ảnh/video sự cố
- **CoreAPI**: Upload media qua API
- **AppMobile**: Upload từ mobile app
- **AnalyticsService**: Thống kê usage
- **NotificationService**: Gửi media trong thông báo

## License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/MNM-DTU-DZ/CityResQ360-DTUDZ/blob/master/LICENSE).
