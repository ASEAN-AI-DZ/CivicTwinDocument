# IncidentService - Quản lý sự cố nâng cao

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Node.js + PostgreSQL + Redis + RabbitMQ  
**Cơ sở dữ liệu:** PostgreSQL (`incident_db`)  
**Trạng thái:** 🟡 Đang phát triển

Dịch vụ Incident quản lý toàn bộ vòng đời của các sự cố trong hệ thống CityResQ360, từ tạo mới, phân công, xử lý đến hoàn thành với khả năng tự động hóa và tối ưu hóa quy trình.

---

## 🎯 Chức năng chính

### 🚨 Quản lý sự cố

- **Tạo, cập nhật, theo dõi sự cố**

  - Tạo sự cố từ phản ánh người dân
  - Tạo sự cố tự động từ AI/IoT
  - Cập nhật thông tin sự cố
  - Theo dõi tiến độ xử lý

- **Mức độ nghiêm trọng**

  - **Thấp**: Sự cố nhỏ, không khẩn cấp
  - **Trung bình**: Cần xử lý trong ngày
  - **Cao**: Ưu tiên cao, cần xử lý nhanh
  - **Nghiêm trọng**: Khẩn cấp, nguy hiểm

- **Quản lý hàng đợi ưu tiên**

  - Sắp xếp theo mức độ nghiêm trọng
  - Tính toán thời gian chờ
  - Cảnh báo quá hạn SLA
  - Tự động leo thang

- **Theo dõi SLA**
  - Thời gian phản hồi
  - Thời gian giải quyết
  - Tỷ lệ hoàn thành đúng hạn
  - Báo cáo vi phạm SLA

### 🎯 Tự động phân công

- **Thuật toán cơ quan gần nhất**

  - Tính toán khoảng cách địa lý
  - Chọn cơ quan phù hợp nhất
  - Xem xét khu vực phụ trách
  - Tối ưu thời gian di chuyển

- **Cân bằng tải**

  - Phân bổ đều công việc
  - Tránh quá tải một cơ quan
  - Theo dõi khối lượng công việc
  - Điều chỉnh động

- **Định tuyến dựa trên kỹ năng**

  - Phân công theo chuyên môn
  - Matching loại sự cố với đơn vị
  - Xem xét kinh nghiệm
  - Tối ưu hiệu quả xử lý

- **Kiểm tra tình trạng sẵn sàng**
  - Trạng thái online/offline
  - Số lượng sự cố đang xử lý
  - Thời gian làm việc
  - Khả năng tiếp nhận

### 📊 Quy trình quản lý trạng thái

- **Chuyển đổi trạng thái**

  - Quy trình rõ ràng, có kiểm soát
  - Validation khi chuyển trạng thái
  - Không cho phép chuyển ngược trái quy định
  - Lưu lịch sử chuyển đổi

- **Quy trình phê duyệt**

  - Phê duyệt trước khi đóng
  - Xác nhận hoàn thành
  - Đánh giá chất lượng
  - Feedback từ người dân

- **Quy tắc leo thang**

  - Tự động leo thang khi quá hạn
  - Thông báo cấp trên
  - Chuyển cho đơn vị khác
  - Ghi nhận vi phạm

- **Nhật ký kiểm toán**
  - Ghi lại mọi thay đổi
  - Ai làm gì, khi nào
  - Lý do thay đổi
  - Truy vết đầy đủ

### 📍 Tính năng không gian địa lý

- **Phân công dựa trên vị trí**

  - Tính toán khoảng cách
  - Chọn đơn vị gần nhất
  - Xem xét ranh giới hành chính
  - Tối ưu lộ trình

- **Tính toán khoảng cách**

  - Haversine formula
  - Khoảng cách thực tế
  - Thời gian di chuyển ước tính
  - Xem xét giao thông

- **Ánh xạ khu vực phủ sóng**

  - Xác định khu vực trách nhiệm
  - Vẽ bản đồ phủ sóng
  - Phát hiện khu vực chồng lấn
  - Tối ưu phân bổ

- **Dữ liệu lịch sử**
  - Lưu trữ sự cố theo vị trí
  - Phân tích điểm nóng
  - Dự đoán sự cố tương lai
  - Bản đồ nhiệt

---

## 🔄 Trạng thái sự cố

```
Mới
   ↓
Đã tiếp nhận
   ↓
Đang xử lý ←→ Tạm hoãn
   ↓
Đã xử lý
   ↓
Đã đóng
```

---

## 📋 Loại sự cố

| Loại              | Mô tả                 | Mức độ       | SLA       |
| ----------------- | --------------------- | ------------ | --------- |
| 🔥 **Cháy nổ**    | Hỏa hoạn, cháy rừng   | Nghiêm trọng | < 15 phút |
| 🌊 **Ngập lụt**   | Ngập úng, lũ lụt      | Cao          | < 30 phút |
| 🚗 **Giao thông** | Tai nạn, ùn tắc       | Cao          | < 20 phút |
| ⚡ **Điện nước**  | Mất điện, vỡ ống nước | Trung bình   | < 1 giờ   |
| 🏗️ **Hạ tầng**    | Đường hư, cầu sập     | Trung bình   | < 2 giờ   |
| 🌳 **Môi trường** | Ô nhiễm, cây đổ       | Thấp         | < 4 giờ   |
| 🗑️ **Rác thải**   | Rác tràn, vệ sinh     | Thấp         | < 8 giờ   |

---

## 🔗 Tích hợp

Dịch vụ này tích hợp với:

- **CoreAPI**: Nhận phản ánh và tạo sự cố
- **NotificationService**: Gửi thông báo cho các bên liên quan
- **AIMLService**: Phân loại và dự đoán sự cố
- **AnalyticsService**: Phân tích dữ liệu sự cố
- **MediaService**: Lưu trữ hình ảnh/video sự cố
- **SearchService**: Tìm kiếm và lọc sự cố
- **FloodEyeService**: Tạo sự cố tự động khi phát hiện ngập
- **IoTService**: Nhận cảnh báo từ cảm biến

---

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/MNM-DTU-DZ/CityResQ360-DTUDZ/blob/master/LICENSE).
