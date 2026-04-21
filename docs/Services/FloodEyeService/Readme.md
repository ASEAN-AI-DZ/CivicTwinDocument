# FloodEyeService - Phát hiện lũ lụt bằng AI

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI + PostGIS  
**Cơ sở dữ liệu:** PostgreSQL với PostGIS (`floodeye_db`)  
**Trạng thái:** 🟡 Đang phát triển

Dịch vụ FloodEye sử dụng trí tuệ nhân tạo để phát hiện và phân tích lũ lụt từ hình ảnh, kết hợp với dữ liệu không gian địa lý để cảnh báo sớm và hỗ trợ ứng phó thảm họa.

---

## 🎯 Chức năng chính

### 🌊 Phát hiện lũ lụt

- **Phân tích hình ảnh bằng AI**
  - Deep learning models (CNN)
  - Transfer learning (ResNet, EfficientNet)
  - Custom trained models
  - Real-time inference

- **Phát hiện mực nước**
  - Nhận diện mặt nước
  - Ước lượng độ sâu
  - So sánh với baseline
  - Tracking water level changes

- **Phân loại mức độ lũ**
  - **Cấp 1 (Thấp)**: Ngập nhẹ, không nguy hiểm
  - **Cấp 2 (Trung bình)**: Ngập vừa, cần theo dõi
  - **Cấp 3 (Cao)**: Ngập nặng, nguy hiểm
  - **Cấp 4 (Nghiêm trọng)**: Lũ lụt nghiêm trọng, khẩn cấp

- **Tính điểm độ tin cậy**
  - Confidence score (0-100%)
  - Model uncertainty
  - Multi-model ensemble
  - Validation với ground truth

### 📸 Xử lý hình ảnh

- **Tiền xử lý hình ảnh**
  - Resize và normalize
  - Color correction
  - Noise reduction
  - Enhancement

- **Trích xuất đặc trưng**
  - Feature extraction
  - Edge detection
  - Texture analysis
  - Pattern recognition

- **Suy luận mô hình**
  - Model inference
  - GPU acceleration
  - Batch processing
  - Caching results

- **Xử lý hàng loạt**
  - Batch image processing
  - Queue management
  - Parallel processing
  - Progress tracking

### 🗺️ Phân tích không gian địa lý

- **Lập bản đồ lũ lụt**
  - Flood extent mapping
  - Inundation areas
  - Water depth visualization
  - Time-series animation

- **Tính toán khu vực bị ảnh hưởng**
  - Affected area calculation
  - Population at risk
  - Infrastructure impact
  - Economic loss estimation

- **Xác định vùng nguy hiểm**
  - Risk zones identification
  - Evacuation routes
  - Safe zones mapping
  - Emergency shelters

- **Dữ liệu lũ lịch sử**
  - Historical flood data
  - Flood frequency analysis
  - Return period estimation
  - Trend analysis

### 🔔 Hệ thống cảnh báo

- **Cảnh báo lũ tự động**
  - Automatic alert generation
  - Multi-level warnings
  - Escalation rules
  - Alert distribution

- **Thông báo mức độ rủi ro**
  - Risk level notification
  - Affected population
  - Recommended actions
  - Real-time updates

- **Tích hợp với NotificationService**
  - Push notifications
  - SMS alerts
  - Email warnings
  - In-app notifications

- **Cảnh báo sớm**
  - Early warning system
  - Predictive alerts
  - Lead time optimization
  - False alarm reduction

---

## 🔗 Tích hợp

Dịch vụ này tích hợp với:

- **MediaService**: Nhận hình ảnh để phân tích
- **IoTService**: Nhận dữ liệu từ cảm biến mực nước
- **IncidentService**: Tạo sự cố tự động khi phát hiện lũ
- **NotificationService**: Gửi cảnh báo lũ lụt
- **AnalyticsService**: Lưu trữ dữ liệu phân tích
- **AIMLService**: Chia sẻ models và infrastructure

---

## 📊 Dữ liệu đầu vào

### Hình ảnh

- **Nguồn**: Camera, Drone, Satellite, Người dân
- **Format**: JPEG, PNG
- **Kích thước**: Tối thiểu 224x224
- **Chất lượng**: Tốt, không bị mờ

### Dữ liệu cảm biến

- Mực nước real-time
- Lượng mưa
- Địa hình
- Dữ liệu lịch sử

---

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
