using System;
using System.ComponentModel.DataAnnotations;

namespace api.Attribute
{
    public class GreaterThanTimeAttribute : ValidationAttribute
    {
        private readonly string _comparisonProperty;

        public GreaterThanTimeAttribute(string comparisonProperty)
        {
            _comparisonProperty = comparisonProperty;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            // Kiểm tra nếu giá trị là null
            if (value == null)
            {
                return new ValidationResult("Giá trị không được để trống.");
            }

            // Kiểm tra và ép kiểu giá trị đầu vào thành TimeSpan
            if (value is not TimeSpan currentValue)
            {
                return new ValidationResult("Giá trị không hợp lệ. Nó phải là một TimeSpan.");
            }

            // Lấy thuộc tính so sánh
            var property = validationContext.ObjectType.GetProperty(_comparisonProperty);
            if (property == null)
            {
                return new ValidationResult($"Thuộc tính {_comparisonProperty} không tồn tại.");
            }

            // Lấy giá trị của thuộc tính so sánh và kiểm tra kiểu
            if (property.GetValue(validationContext.ObjectInstance) is not TimeSpan comparisonValue)
            {
                return new ValidationResult("Giá trị so sánh không hợp lệ. Nó phải là một TimeSpan.");
            }

            // So sánh giá trị
            if (currentValue <= comparisonValue)
            {
                return new ValidationResult(ErrorMessage ?? "Giá trị phải lớn hơn giá trị so sánh.");
            }

            return ValidationResult.Success;
        }
    }
}
