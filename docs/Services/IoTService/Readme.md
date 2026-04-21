# IoTService - Thu thập & giám sát dữ liệu IoT

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Node.js + TimescaleDB + MQTT + Redis  
**Cơ sở dữ liệu:** TimescaleDB (`iot_db`)  
**Trạng thái:** 🟡 Đang phát triển

Dịch vụ IoT quản lý kết nối, thu thập dữ liệu và giám sát các thiết bị IoT trong hệ thống CivicTwin, bao gồm cảm biến môi trường, camera giám sát và các thiết bị thông minh khác.

---

## 🎯 Chức năng chính

### 📡 Thu thập dữ liệu cảm biến

- **Hỗ trợ giao thức MQTT**

  - Đăng ký/Phát hành topics
  - Mức độ QoS (0, 1, 2)
  - Tin nhắn được giữ lại
  - Thông điệp di chúc

- **HTTP REST API**

  - Điểm cuối POST cho dữ liệu
  - Tải lên hàng loạt
  - Webhook callbacks
  - Xác thực API

- **Nhập dữ liệu thời gian thực**

  - Xử lý luồng dữ liệu
  - Độ trễ thấp
  - Thông lượng cao
  - Bộ đệm và hàng đợi

- **Xử lý dữ liệu hàng loạt**
  - Chèn hàng loạt
  - Xử lý theo lô
  - Nhập theo lịch
  - Xác thực dữ liệu

### 📊 Dữ liệu chuỗi thời gian

- **TimescaleDB để lưu trữ hiệu quả**

  - Hypertables cho chuỗi thời gian
  - Phân vùng tự động
  - Nén dữ liệu
  - Chính sách lưu giữ

- **Tổng hợp dữ liệu**

  - **1 phút**: Giám sát thời gian thực
  - **5 phút**: Phân tích ngắn hạn
  - **1 giờ**: Xu hướng dài hạn
  - **1 ngày**: Dữ liệu lịch sử

- **Truy vấn dữ liệu lịch sử**

  - Truy vấn theo khoảng thời gian
  - Hàm tổng hợp (TB, MIN, MAX, TỔNG)
  - Lấy mẫu giảm
  - Lấp đầy khoảng trống

- **Chính sách lưu giữ dữ liệu**
  - Dữ liệu thô: 30 ngày
  - Tổng hợp 1 phút: 90 ngày
  - Tổng hợp 1 giờ: 1 năm
  - Tổng hợp ngày: Vĩnh viễn

### 🔔 Cảnh báo ngưỡng

- **Ngưỡng có thể cấu hình**

  - Ngưỡng trên/dưới
  - Ngưỡng động (thích ứng)
  - Nhiều ngưỡng
  - Cấu hình theo từng cảm biến

- **Công cụ quy tắc cảnh báo**

  - Công cụ quy tắc
  - Điều kiện phức tạp
  - Quy tắc dựa trên thời gian
  - Cảnh báo tổng hợp

- **Cảnh báo đa cấp**

  - Cảnh báo
  - Nghiêm trọng
  - Khẩn cấp
  - Chính sách leo thang

- **Thông báo cảnh báo qua RabbitMQ**
  - Phát hành sự kiện cảnh báo
  - Tích hợp với NotificationService
  - Loại bỏ trùng lặp cảnh báo
  - Tương quan cảnh báo

### 🎛️ Quản lý cảm biến

- **Đăng ký/hủy đăng ký cảm biến**

  - Cấp phát thiết bị
  - Tự động phát hiện
  - Đăng ký hàng loạt
  - Ngừng hoạt động

- **Metadata cảm biến**

  - Thông tin thiết bị (model, nhà sản xuất)
  - Vị trí (tọa độ GPS)
  - Ngày lắp đặt
  - Chủ sở hữu/Người vận hành

- **Giám sát sức khỏe**

  - Trạng thái trực tuyến/ngoại tuyến
  - Thời gian nhìn thấy lần cuối
  - Mức pin
  - Cường độ tín hiệu
  - Tỷ lệ lỗi

- **Theo dõi hiệu chuẩn**
  - Lịch hiệu chuẩn
  - Lịch sử hiệu chuẩn
  - Phát hiện trôi dạt
  - Cảnh báo bảo trì

---

## 🔌 Các loại cảm biến được hỗ trợ

### 🌊 Cảm biến mực nước

- Đo mức nước sông, hồ
- Phát hiện ngập lụt
- Cảnh báo mực nước cao
- Tích hợp với FloodEyeService

### 💨 Cảm biến chất lượng không khí

- PM2.5, PM10
- CO, CO2, NO2
- Nhiệt độ, độ ẩm
- Chỉ số AQI

### 📹 Camera giao thông

- Phát hiện ùn tắc
- Đếm phương tiện
- Nhận diện biển số
- Phát hiện vi phạm

### 🌦️ Trạm thời tiết

- Nhiệt độ, độ ẩm
- Lượng mưa
- Tốc độ gió
- Áp suất khí quyển

### 🌊 Cảm biến phát hiện lũ lụt

- Mực nước thời gian thực
- Tốc độ dòng chảy
- Cảnh báo sớm
- Dự báo lũ

---

## 🔗 Tích hợp

Dịch vụ này tích hợp với:

- **MQTT Broker (Mosquitto)**: Nhận dữ liệu từ cảm biến
- **FloodEyeService**: Cung cấp dữ liệu cảm biến mực nước
- **AnalyticsService**: Lưu trữ và phân tích dữ liệu
- **NotificationService**: Gửi cảnh báo khi vượt ngưỡng
- **IncidentService**: Tạo sự cố tự động từ dữ liệu cảm biến
- **Orion-LD**: Đồng bộ dữ liệu theo chuẩn NGSI-LD

---

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
