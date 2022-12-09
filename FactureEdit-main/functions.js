function dateFormat (inputDate)
{
    let rawDate = new Date(Date.parse(inputDate))
    return `${rawDate.getDate()}/${rawDate.getMonth() > 8 ? '' : 0}${rawDate.getMonth() + 1}/${rawDate.getFullYear()}`
}