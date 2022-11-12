class apiConfig {
    wallet = "http://localhost:51426/api/v1/Wallets";
    location = "http://localhost:51426/api/v1/locations"; //api địa điểm
    voucher = "http://localhost:51426/api/v1/vouchers"; //api mã giảm giá
    user = "http://localhost:51426/api/v1/users"; //api người dùng
    post = "http://localhost:51426/api/v1/posts"; //api bài đăng
    tour = "http://localhost:51426/api/v1/tours"; //api tour du lịch
    category = "http://localhost:51426/api/v1/categories"; //api danh mục
    auth = "http://localhost:51426/api/v1/auth"; //api auth
    comment = "http://localhost:51426/api/v1/comments"; //api bình luận
    searchHistory = "http://localhost:51426/api/v1/searchhistories"; //api lịch sử tìm kiếm

}
export default new apiConfig();