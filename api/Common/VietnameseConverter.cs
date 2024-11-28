using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Common
{
    public class VietnameseConverter
    {
        public static string ConvertToUnaccented(string text)
        {
            if (string.IsNullOrEmpty(text)) return text;

            // Thay thế các ký tự "đ" và "Đ" bằng "d" và "D" trước khi chuẩn hóa
            text = text.Replace('đ', 'd').Replace('Đ', 'D');

            // Chuyển chuỗi thành dạng chuẩn hóa FormD để tách các ký tự có dấu và không dấu
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            // Duyệt qua từng ký tự và chỉ giữ lại những ký tự không phải là ký tự dấu
            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            // Chuẩn hóa chuỗi lại thành dạng bình thường và trả về kết quả không dấu
            return stringBuilder.ToString().Normalize(NormalizationForm.FormC).ToLower();
        }
    }
}