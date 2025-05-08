import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PolicyComponent() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">CHÍNH SÁCH & QUY ĐỊNH</CardTitle>
          <CardDescription>
            Free Driver xin thông báo về việc triển khai nền tảng cho thuê xe tự lái. Chúng tôi cam kết đảm bảo quyền
            lợi và trách nhiệm của các bên tham gia theo quy định của pháp luật Việt Nam.
          </CardDescription>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="section-1" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-semibold px-4">1. Quy định về Đăng ký & Xác thực</AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-base mb-2">A. Đối với Chủ xe</h3>
                <p className="mb-2">Phải cung cấp đầy đủ và chính xác thông tin:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Họ tên, địa chỉ, email, số điện thoại</li>
                  <li>Giấy phép lái xe ô tô còn hiệu lực</li>
                  <li>Thông tin tài khoản ngân hàng</li>
                </ul>
                <p className="mt-2">Phải đủ 18 tuổi trở lên</p>
                <p className="mt-2">Chịu trách nhiệm về nguồn gốc và quyền sở hữu xe</p>
                <p>Đảm bảo xe có đầy đủ giấy tờ pháp lý và trong tình trạng an toàn (Giấy tờ sở hữu xe, bảo hiểm xe, giấy đăng kiểm)</p>
              </div>

              <div>
                <h3 className="font-medium text-base mb-2">B. Đối với Khách thuê</h3>
                <p className="mb-2">Phải cung cấp đầy đủ và chính xác thông tin:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Họ tên, địa chỉ, email, số điện thoại</li>
                  <li>Giấy phép lái xe ô tô còn hiệu lực</li>
                  <li>Thông tin thanh toán</li>
                </ul>
                <p className="mt-2">Phải đủ 18 tuổi trở lên</p>
                <p>Có giấy phép lái xe hợp lệ với hạng xe thuê</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-2" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-semibold px-4">2. Quy định về Đặt xe & Thanh toán</AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-base mb-2">A. Quy định Đặt xe</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Đặt xe trước tối thiểu 1.5 giờ</li>
                  <li>Thời gian thuê từ 1-30 ngày</li>
                  <li>Mỗi khách hàng được phép có tối đa 1 đơn đặt xe đang hoạt động</li>
                  <li>Xe phải còn trống và không có lịch đặt trùng</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-base mb-2">B. Cơ cấu Giá & Thanh toán</h3>
                <p className="mb-2">Giá thuê xe được tính theo ngày</p>
                <p className="mb-2">Cấu trúc giá bao gồm:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Giá thuê cơ bản</li>
                  <li>Phí nền tảng (10% giá thuê)</li>
                </ul>
                <p className="mt-2">Phương thức thanh toán:</p>
                <ul className="list-disc pl-6">
                  <li>Thanh toán 100% giá trị chuyến xe khi được chủ xe phê duyệt</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-3" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-semibold px-4">3. Quy định về Giao nhận xe</AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-base mb-2">A. Kiểm tra & Xác nhận</h3>
                <p className="mb-2">Chủ xe phải cung cấp:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Giấy đăng ký xe (bản photo công chứng)</li>
                  <li>Giấy kiểm định</li>
                  <li>Giấy bảo hiểm xe</li>
                </ul>
                <p className="mt-2 mb-2">Khách thuê phải xuất trình:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>CCCD gắn chip</li>
                  <li>Giấy phép lái xe (bản gốc)</li>
                  <li>Tài sản thế chấp (20 triệu hoặc xe máy tương đương)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-base mb-2">B. Yêu cầu về Hình ảnh</h3>
                <p className="mb-2">Bắt buộc chụp ảnh khi giao/nhận xe:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Ngoại thất xe</li>
                  <li>Mức xăng</li>
                  <li>Vị trí đỗ xe</li>
                  <li>Chìa khóa xe</li>
                  <li>Cốp xe</li>
                </ul>
                <p className="mt-2 mb-2">Quy định về ảnh:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Kích thước tối đa: 10MB/ảnh</li>
                  <li>Định dạng: jpg, jpeg, png</li>
                  <li>Số lượng: tối thiểu 1 ảnh/loại</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-4" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-semibold px-4">
            4. Quy định về Bảo hiểm & Bồi thường
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-base mb-2">A. Trách nhiệm của Khách thuê</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Đền bù 100% giá trị phụ tùng chính hãng nếu phát hiện thay đổi</li>
                  <li>Chịu 100% chi phí sửa chữa nếu có hư hỏng do lỗi của khách</li>
                  <li>Thanh toán chi phí vệ sinh xe (nếu cần)</li>
                  <li>Bồi thường ngày xe không hoạt động (theo giá thuê)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-base mb-2">B. Trách nhiệm của Chủ xe</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Đảm bảo xe trong tình trạng an toàn</li>
                  <li>Bảo dưỡng xe định kỳ</li>
                  <li>Mua bảo hiểm xe theo quy định</li>
                  <li>Hỗ trợ xử lý sự cố trong khả năng</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-5" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-semibold px-4">5. Chính sách Hủy chuyến</AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-base mb-2">A. Phí hủy chuyến</h3>
                <p className="mb-2">Đối với người thuê:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Hủy chuyến trước 7 ngày giao xe: hoàn 100%</li>
                  <li>Hủy chuyến trước 5 ngày giao xe: hoàn 50%</li>
                  <li>Hủy chuyến trước 3 ngày giao xe: hoàn 30%</li>
                  <li>Hủy chuyến nhỏ hơn 3 ngày giao xe: hoàn 0%</li>
                </ul>
                <p className="mt-2 mb-2">Đối với chủ xe:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Hủy chuyến trước 24h giao xe: đền 50%</li>
                  <li>hủy chuyến trong vòng 3 ngày giao xe: đền 30%</li>
                  <li>hủy chuyến trong vòng 7 ngày giao xe: đền 10%</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-base mb-2">B. Xử lý vi phạm</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Khóa tài khoản nếu hủy chuyến 5 lần</li>
                  <li>Hoàn trả 100% tiền nếu chủ xe hủy chuyến</li>
                  <li>Bồi thường theo quy định nếu vi phạm cam kết trong hợp đồng</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-6" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-semibold px-4">6. Quy định về Kiểm định</AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-base mb-2">A. Trách nhiệm của Chủ xe</h3>
                <p>
                  Chịu trách nhiệm cung cấp đầy đủ thông tin, giấy tờ pháp lý và đảm bảo xe trong tình trạng an toàn
                  trước khi đưa lên hệ thống cho thuê.
                </p>
                <p className="mt-2">
                  Phải thực hiện đăng kiểm định kỳ cho xe theo quy định của Pháp Luật để cung cấp trong quá trình kiểm định xe của hệ thống
                </p>
              </div>

              <div>
                <h3 className="font-medium text-base mb-2">B. Trách nhiệm của Kỹ thuật viên</h3>
                <p>
                  Khi nhận được lịch kiểm định trong trạng thái chờ, phải đánh dấu đang thực hiện kiểm định thông qua hệ
                  thống chậm nhất là 15 phút sau thời điểm xác minh được đề ra trong lịch kiểm định.
                </p>
                <p className="mt-2">
                  Phải hoàn thành xử lý kiểm định chậm nhất là 60 phút sau thời điểm kiểm định được đề ra trong lịch
                  kiểm định.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-7" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-semibold px-4">7. Quy định về Bảo mật thông tin</AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <ul className="list-disc pl-6 space-y-1">
              <li>Mã hóa thông tin nhạy cảm (số điện thoại, tài khoản ngân hàng ,số giấy phép lái xe)</li>
              <li>Chỉ chia sẻ thông tin theo yêu cầu pháp luật</li>
              <li>Lưu trữ dữ liệu theo pháp luật hiện hành</li>
              <li>Cho phép người dùng yêu cầu xóa dữ liệu</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-8" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-semibold px-4">8. Giải quyết Tranh chấp</AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <ul className="list-disc pl-6 space-y-1">
              <li>Ưu tiên giải quyết thông qua thương lượng</li>
              <li>Hỗ trợ hòa giải giữa các bên</li>
              <li>Tuân thủ quy định pháp luật hiện hành</li>
              <li>Có thể nhờ cơ quan chức năng can thiệp</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-8" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-semibold px-4">9. Quy định về rút tiền</AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <ul className="list-disc pl-6 space-y-1">
              <li>Chủ xe, người thuê cần kiểm tra kỹ thông tin tài khoản ngân hàng đúng chính xác tài khoản nhận tiền.</li>
              <li>Mọi sai sót trong quá trình nhập thông tin tài khoản nhận tiền, hệ thống sẽ không chịu trách nhiệm.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

