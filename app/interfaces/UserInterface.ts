export interface User {
  id: number;                  // ID của người dùng
  username: string;           // Tên đăng nhập
  email: string;              // Địa chỉ email
  fullname: string;           // Họ và tên đầy đủ
  status: 'active' | 'locked'; // Trạng thái tài khoản
  password: string;           // Mật khẩu (cần mã hóa trong thực tế)
  role: 'admin' | 'user';      // Vai trò của người dùng
  isLoggedIn: boolean;        // Trạng thái đăng nhập
  avatar?: string;            // Đường dẫn đến avatar (tùy chọn)
  phone?: string;             // Số điện thoại (tùy chọn)
  address?: string;           // Địa chỉ (tùy chọn)
  created_at: string;         // Thời gian tạo tài khoản
  updated_at: string;         // Thời gian cập nhật tài khoản
}