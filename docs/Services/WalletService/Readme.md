# WalletService - Quản lý ví điểm CityPoint

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Node.js + PostgreSQL + Redis  
**Cơ sở dữ liệu:** PostgreSQL (shared database)  
**Trạng thái:** 🟡 Đang phát triển

Dịch vụ Wallet quản lý hệ thống ví điểm CityPoint, cho phép người dùng tích lũy điểm thưởng khi đóng góp phản ánh hữu ích và đổi điểm lấy phần thưởng trong hệ thống CivicTwin.

---

## 🎯 Chức năng chính

### 💰 Quản lý ví CityPoint

- **Tạo ví người dùng**
  - Tự động tạo khi đăng ký
  - Ví mặc định cho mỗi user
  - Số dư ban đầu: 0 points
  - Unique wallet ID

- **Kiểm tra số dư**
  - Xem số điểm hiện tại
  - Lịch sử biến động
  - Điểm sắp hết hạn
  - Tổng điểm tích lũy

- **Quản lý điểm**
  - Cộng điểm (earn points)
  - Trừ điểm (redeem points)
  - Điểm thưởng (bonus points)
  - Điểm hết hạn (expiry)

### 🏆 Hệ thống tích điểm

- **Tích điểm từ hoạt động**
  - Gửi phản ánh hợp lệ: +10 points
  - Phản ánh được xác nhận: +20 points
  - Phản ánh được giải quyết: +30 points
  - Phản ánh chất lượng cao: +50 points
  - Bình luận hữu ích: +5 points
  - Check-in hàng ngày: +2 points

- **Điểm thưởng đặc biệt**
  - Người dùng tích cực: +100 points/tháng
  - Milestone rewards
  - Event bonuses
  - Referral rewards

- **Hệ số nhân điểm**
  - Người dùng mới: x1.5 (30 ngày đầu)
  - Người dùng VIP: x2.0
  - Sự kiện đặc biệt: x3.0
  - Khu vực ưu tiên: x1.2

### 🎁 Đổi điểm thưởng

- **Voucher & giảm giá**
  - Voucher mua sắm
  - Giảm giá dịch vụ
  - Phiếu quà tặng
  - Mã khuyến mãi

- **Dịch vụ đô thị**
  - Giảm phí dịch vụ công
  - Ưu tiên xử lý phản ánh
  - Truy cập tính năng premium
  - Hỗ trợ ưu tiên

- **Quyên góp**
  - Quyên góp cho cộng đồng
  - Hỗ trợ người khó khăn
  - Dự án môi trường
  - Từ thiện

- **Quà tặng**
  - Merchandise
  - Sản phẩm đối tác
  - Thẻ cào điện thoại
  - E-vouchers

### 📊 Lịch sử giao dịch

- **Theo dõi giao dịch**
  - Lịch sử đầy đủ
  - Lọc theo loại
  - Tìm kiếm giao dịch
  - Export báo cáo

- **Loại giao dịch**
  - Earn (Tích điểm)
  - Redeem (Đổi điểm)
  - Bonus (Thưởng)
  - Expired (Hết hạn)
  - Refund (Hoàn điểm)

- **Thông tin chi tiết**
  - Số điểm
  - Ngày giờ
  - Mô tả
  - Trạng thái
  - Reference ID

---

## 🔗 Tích hợp

Dịch vụ này tích hợp với:

- **CoreAPI**: API quản lý ví và giao dịch
- **IncidentService**: Tích điểm khi phản ánh được xử lý
- **NotificationService**: Thông báo khi có điểm mới/đổi điểm
- **AnalyticsService**: Phân tích hoạt động ví
- **RabbitMQ**: Lắng nghe sự kiện tích điểm

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
