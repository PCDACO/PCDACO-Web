import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Car, User, Shield, FileText, Clock, CreditCard, AlertTriangle } from "lucide-react"

export default function PolicyComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Chính Sách & Điều Khoản</h1>
        <p className="text-muted-foreground">Các quy định và điều khoản sử dụng nền tảng cho thuê xe</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
          <TabsTrigger value="renter">Người Thuê</TabsTrigger>
          <TabsTrigger value="owner">Chủ Xe</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Tổng Quan Chính Sách
              </CardTitle>
              <CardDescription>Thông tin chung về các chính sách và quy định của nền tảng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Chào mừng bạn đến với nền tảng cho thuê xe của chúng tôi. Tài liệu này quy định các điều khoản và điều
                kiện chi phối việc sử dụng dịch vụ của chúng tôi.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Cam Kết Của Chúng Tôi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Đảm bảo tính minh bạch trong mọi giao dịch</li>
                      <li>Bảo vệ thông tin cá nhân của người dùng</li>
                      <li>Hỗ trợ giải quyết tranh chấp công bằng</li>
                      <li>Cung cấp nền tảng an toàn và đáng tin cậy</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Quy Định Chung
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Tuân thủ pháp luật Việt Nam</li>
                      <li>Cung cấp thông tin chính xác và đầy đủ</li>
                      <li>Không sử dụng dịch vụ cho mục đích bất hợp pháp</li>
                      <li>Tôn trọng quyền riêng tư của người dùng khác</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renter" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Chính Sách Cho Người Thuê Xe
              </CardTitle>
              <CardDescription>Quy định và hướng dẫn dành cho người thuê xe</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Điều Kiện Đăng Ký & Xác Minh</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Để đăng ký làm người thuê xe, bạn cần:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Đủ 18 tuổi trở lên</li>
                      <li>Có giấy phép lái xe hợp lệ (tối thiểu 12 tháng)</li>
                      <li>Cung cấp CMND/CCCD để xác minh danh tính</li>
                      <li>Hoàn thành quy trình xác minh số điện thoại và email</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Quy Trình Đặt Xe & Thanh Toán</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Quy trình đặt xe bao gồm:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Tìm kiếm và chọn xe phù hợp</li>
                      <li>Gửi yêu cầu đặt xe với thời gian thuê cụ thể</li>
                      <li>Chờ chủ xe xác nhận (tối đa 24 giờ)</li>
                      <li>Thanh toán đặt cọc (30% giá trị đơn hàng)</li>
                      <li>Thanh toán số tiền còn lại khi nhận xe</li>
                    </ul>
                    <p className="mt-2">Các phương thức thanh toán được chấp nhận:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Thẻ tín dụng/ghi nợ</li>
                      <li>Chuyển khoản ngân hàng</li>
                      <li>Ví điện tử (MoMo, ZaloPay, VNPay)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Nhận & Trả Xe</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Khi nhận xe:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Kiểm tra kỹ tình trạng xe và ghi nhận bằng hình ảnh</li>
                      <li>Xác nhận mức nhiên liệu và số km ban đầu</li>
                      <li>Ký biên bản bàn giao xe với chủ xe</li>
                    </ul>
                    <p className="mt-2">Khi trả xe:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Trả xe đúng thời gian và địa điểm đã thỏa thuận</li>
                      <li>Đảm bảo xe sạch sẽ và mức nhiên liệu như khi nhận</li>
                      <li>Ký biên bản trả xe với chủ xe</li>
                      <li>Thanh toán các chi phí phát sinh (nếu có)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Chính Sách Hủy Đơn</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Quy định hủy đơn đặt xe:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Hủy trước 72 giờ: Hoàn trả 100% tiền cọc</li>
                      <li>Hủy trước 48-72 giờ: Hoàn trả 70% tiền cọc</li>
                      <li>Hủy trước 24-48 giờ: Hoàn trả 50% tiền cọc</li>
                      <li>Hủy trong vòng 24 giờ: Không hoàn trả tiền cọc</li>
                    </ul>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Lưu ý: Trường hợp bất khả kháng sẽ được xem xét riêng.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Bảo Hiểm & Xử Lý Sự Cố</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Quy định về bảo hiểm:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Mọi xe đều có bảo hiểm trách nhiệm dân sự cơ bản</li>
                      <li>Người thuê có thể mua thêm gói bảo hiểm toàn diện</li>
                      <li>Mức khấu trừ bảo hiểm: 20% giá trị thiệt hại (tối thiểu 2 triệu đồng)</li>
                    </ul>
                    <p className="mt-2">Xử lý sự cố:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Tai nạn: Thông báo ngay cho chủ xe và cơ quan chức năng</li>
                      <li>Hỏng hóc: Liên hệ đường dây hỗ trợ 24/7</li>
                      <li>Mất cắp: Báo công an và thông báo cho nền tảng trong vòng 2 giờ</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="owner" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Chính Sách Cho Chủ Xe
              </CardTitle>
              <CardDescription>Quy định và hướng dẫn dành cho chủ xe</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Điều Kiện Đăng Ký Xe</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Để đăng ký xe cho thuê, bạn cần:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Sở hữu xe hợp pháp (có đăng ký xe chính chủ)</li>
                      <li>Xe có đăng kiểm còn hiệu lực (tối thiểu 3 tháng)</li>
                      <li>Xe có bảo hiểm trách nhiệm dân sự bắt buộc</li>
                      <li>Xe không quá 10 năm tuổi tính từ năm sản xuất</li>
                      <li>Hoàn thành quy trình xác minh danh tính chủ xe</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Đăng Ký & Quản Lý Xe</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Quy trình đăng ký xe:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cung cấp thông tin và hình ảnh đầy đủ về xe</li>
                      <li>Tải lên giấy tờ xe hợp lệ (đăng ký, đăng kiểm, bảo hiểm)</li>
                      <li>Thiết lập giá cho thuê và các điều kiện kèm theo</li>
                      <li>Chờ phê duyệt từ nền tảng (1-3 ngày làm việc)</li>
                    </ul>
                    <p className="mt-2">Quản lý lịch xe:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cập nhật lịch trống/bận của xe</li>
                      <li>Phản hồi yêu cầu đặt xe trong vòng 24 giờ</li>
                      <li>Quản lý đơn hàng và lịch sử cho thuê</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Bàn Giao & Nhận Xe</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Khi bàn giao xe:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Kiểm tra giấy phép lái xe của người thuê</li>
                      <li>Chụp ảnh tình trạng xe trước khi giao</li>
                      <li>Ghi nhận mức nhiên liệu và số km ban đầu</li>
                      <li>Ký biên bản bàn giao xe với người thuê</li>
                      <li>Hướng dẫn sử dụng các tính năng đặc biệt của xe</li>
                    </ul>
                    <p className="mt-2">Khi nhận lại xe:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Kiểm tra kỹ tình trạng xe so với lúc giao</li>
                      <li>Xác nhận mức nhiên liệu và số km khi trả</li>
                      <li>Ghi nhận các hư hỏng hoặc vấn đề (nếu có)</li>
                      <li>Ký biên bản nhận xe với người thuê</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Chính Sách Thanh Toán & Hoa Hồng</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Quy định thanh toán:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Nhận 70% tiền cọc ngay sau khi người thuê đặt cọc</li>
                      <li>Nhận phần còn lại sau khi hoàn thành chuyến đi</li>
                      <li>Thanh toán được chuyển vào tài khoản đã đăng ký trong vòng 24 giờ</li>
                    </ul>
                    <p className="mt-2">Phí hoa hồng nền tảng:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Phí cơ bản: 15% trên tổng giá trị đơn hàng</li>
                      <li>Chủ xe VIP (trên 20 chuyến/tháng): 12%</li>
                      <li>Chủ xe Platinum (trên 50 chuyến/tháng): 10%</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Xử Lý Sự Cố & Bồi Thường</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>Quy trình xử lý sự cố:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Tiếp nhận thông báo từ người thuê</li>
                      <li>Cung cấp hỗ trợ kỹ thuật hoặc hướng dẫn xử lý</li>
                      <li>Phối hợp với bảo hiểm và đơn vị cứu hộ khi cần</li>
                    </ul>
                    <p className="mt-2">Chính sách bồi thường:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Hư hỏng nhỏ: Người thuê chịu 100% chi phí sửa chữa</li>
                      <li>Hư hỏng lớn: Áp dụng theo quy định bảo hiểm</li>
                      <li>Mất xe: Bồi thường theo giá trị thị trường của xe</li>
                      <li>Thời gian không hoạt động: Được bồi thường theo giá thuê trung bình</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-10 border-t pt-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Thời Gian Hỗ Trợ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Thứ 2 - Thứ 6: 8:00 - 20:00</p>
              <p className="text-sm">Thứ 7 - Chủ nhật: 9:00 - 18:00</p>
              <p className="text-sm mt-2">Đường dây nóng 24/7: 1900 xxxx</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Phương Thức Thanh Toán
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Chúng tôi chấp nhận:</p>
              <ul className="text-sm list-disc pl-5">
                <li>Thẻ tín dụng/ghi nợ</li>
                <li>Chuyển khoản ngân hàng</li>
                <li>Ví điện tử (MoMo, ZaloPay, VNPay)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Bảo Mật & Quyền Riêng Tư
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo quy định pháp luật hiện hành.
              </p>
              <p className="text-sm mt-2">
                Xem đầy đủ{" "}
                <a href="#" className="text-primary underline">
                  Chính sách bảo mật
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
