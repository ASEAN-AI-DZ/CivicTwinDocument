# SearchService - Công cụ tìm kiếm nâng cao

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Go 1.21 + Gin + Meilisearch  
**Cơ sở dữ liệu:** Meilisearch  
**Trạng thái:** 🟡 Đang phát triển

Dịch vụ Search cung cấp khả năng tìm kiếm nhanh, chính xác và linh hoạt cho hệ thống CivicTwin với hỗ trợ tìm kiếm toàn văn, lọc nâng cao và tìm kiếm không gian địa lý.

---

## 🎯 Chức năng chính

### 🔍 Tìm kiếm toàn văn

- **Tìm kiếm nhanh chịu lỗi chính tả**

  - Chấp nhận lỗi đánh máy (1-2 ký tự)
  - Khớp mờ
  - Tìm kiếm ngữ âm
  - Gợi ý tự động sửa lỗi

- **Hỗ trợ đa ngôn ngữ**

  - Tiếng Việt
  - Tiếng Anh
  - Hỗ trợ Unicode
  - Phát hiện ngôn ngữ
  - Lập chỉ mục đa ngôn ngữ

- **Tìm kiếm theo khía cạnh**

  - Khía cạnh danh mục
  - Khía cạnh trạng thái
  - Khía cạnh phạm vi ngày
  - Khía cạnh vị trí
  - Khía cạnh tùy chỉnh

- **Kết quả tìm kiếm tức thì**
  - Tìm kiếm khi gõ
  - Kết quả tức thì (< 50ms)
  - Làm nổi bật kết quả khớp
  - Kết quả được xếp hạng
  - Phân trang

### 🎯 Bộ lọc nâng cao

- **Lọc theo danh mục**

  - Nhiều danh mục
  - Danh mục phân cấp
  - Kết hợp danh mục
  - Loại trừ danh mục

- **Lọc theo trạng thái**

  - Mới, Đang xử lý, Đã xử lý, Đã đóng
  - Chọn nhiều trạng thái
  - Nhóm trạng thái
  - Bộ lọc trạng thái tùy chỉnh

- **Phạm vi ngày**

  - Chọn phạm vi ngày
  - Ngày tương đối (7 ngày qua, tháng trước)
  - Phạm vi ngày tùy chỉnh
  - Sắp xếp theo ngày

- **Tìm kiếm theo vị trí**
  - Tìm kiếm dựa trên vị trí
  - Tìm kiếm theo bán kính
  - Tìm kiếm hộp giới hạn
  - Vị trí gần nhất

### 📍 Tìm kiếm không gian địa lý

- **Tìm kiếm theo bán kính**

  - Tìm kiếm trong bán kính
  - Tính toán khoảng cách
  - Sắp xếp theo khoảng cách
  - Nhiều tùy chọn bán kính

- **Tìm kiếm hộp giới hạn**

  - Tìm kiếm khu vực hình chữ nhật
  - Tìm kiếm khung nhìn bản đồ
  - Tìm kiếm đa giác
  - Ranh giới tùy chỉnh

- **Vị trí gần nhất**
  - Tìm kiếm láng giềng gần nhất
  - K láng giềng gần nhất
  - Xếp hạng dựa trên khoảng cách
  - Phân cụm vị trí

### 🔄 Đồng bộ dữ liệu

- **Đồng bộ thời gian thực từ MySQL**

  - Lập chỉ mục thời gian thực
  - Bắt giữ thay đổi dữ liệu
  - Đồng bộ theo sự kiện
  - Cập nhật độ trễ thấp

- **Cập nhật tăng dần**

  - Cập nhật gia tăng
  - Đồng bộ hóa delta
  - Lập chỉ mục hiệu quả
  - Thời gian ngừng hoạt động tối thiểu

- **Lập chỉ mục hàng loạt**
  - Lập chỉ mục hàng loạt
  - Xử lý theo lô
  - Lập chỉ mục song song
  - Theo dõi tiến độ

---

## 🚀 Tính năng Meilisearch

### Hiệu suất cao

- Tìm kiếm < 50ms
- Lập chỉ mục nhanh
- Tiết kiệm bộ nhớ
- Mở rộng theo chiều ngang

### Dễ sử dụng

- API RESTful
- Cấu hình đơn giản
- Tự động phát hiện schema
- Thân thiện với nhà phát triển

### Tính năng nâng cao

- Hỗ trợ từ đồng nghĩa
- Từ dừng
- Xếp hạng tùy chỉnh
- Lọc
- Sắp xếp

---

## 🔗 Tích hợp

Dịch vụ này tích hợp với:

- **CoreAPI**: Cung cấp API tìm kiếm
- **MySQL**: Đồng bộ dữ liệu từ cơ sở dữ liệu chính
- **RabbitMQ**: Nhận sự kiện cập nhật
- **AIMLService**: Tìm kiếm ngữ nghĩa
- **AppMobile**: Tìm kiếm từ ứng dụng

---
## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
