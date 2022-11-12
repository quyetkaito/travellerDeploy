import Enum from "@/enum/enum.js";
import resource from "@/enum-resource/resource";
//file cấu hình các option cho bộ lọc ngày tháng 
const DateOptions = [{
        label: resource.DateOptions.ThisMonth,
        value: Enum.DateOptions.ThisMonth
    },
    {
        label: resource.DateOptions.LastMonth,
        value: Enum.DateOptions.LastMonth
    },
    {
        label: resource.DateOptions.ThisYear,
        value: Enum.DateOptions.ThisYear
    },
    {
        label: resource.DateOptions.LastYear,
        value: Enum.DateOptions.LastYear
    },
    {
        label: resource.DateOptions.LastThreeMonth,
        value: Enum.DateOptions.LastThreeMonth
    },
    {
        label: resource.DateOptions.January,
        value: Enum.DateOptions.January
    },
    {
        label: resource.DateOptions.February,
        value: Enum.DateOptions.February
    },
    {
        label: resource.DateOptions.March,
        value: Enum.DateOptions.March
    },
    {
        label: resource.DateOptions.April,
        value: Enum.DateOptions.April
    },
    {
        label: resource.DateOptions.May,
        value: Enum.DateOptions.May
    },
    {
        label: resource.DateOptions.June,
        value: Enum.DateOptions.June
    },
    {
        label: resource.DateOptions.July,
        value: Enum.DateOptions.July
    },
    {
        label: resource.DateOptions.August,
        value: Enum.DateOptions.August
    },
    {
        label: resource.DateOptions.September,
        value: Enum.DateOptions.September
    },
    {
        label: resource.DateOptions.October,
        value: Enum.DateOptions.October
    },
    {
        label: resource.DateOptions.November,
        value: Enum.DateOptions.November
    },
    {
        label: resource.DateOptions.December,
        value: Enum.DateOptions.December
    }
]
export default DateOptions