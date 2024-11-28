using System;
using System.ComponentModel.DataAnnotations;

public class GreaterThanYearAttribute : ValidationAttribute
{
    private readonly string _comparisonProperty;

    public GreaterThanYearAttribute(string comparisonProperty)
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

        // Ép kiểu giá trị đầu vào
        if (!int.TryParse(value.ToString(), out var currentValue))
        {
            return new ValidationResult("Giá trị phải là một số nguyên.");
        }

        // Lấy thuộc tính so sánh
        var property = validationContext.ObjectType.GetProperty(_comparisonProperty);

        if (property == null)
        {
            return new ValidationResult($"Thuộc tính {_comparisonProperty} không tồn tại.");
        }

        // Lấy giá trị của thuộc tính so sánh
        var comparisonValue = (int)property.GetValue(validationContext.ObjectInstance);

        if (currentValue <= comparisonValue)
        {
            return new ValidationResult(ErrorMessage ?? "Giá trị phải lớn hơn giá trị của thuộc tính so sánh.");
        }

        return ValidationResult.Success;
    }
}
