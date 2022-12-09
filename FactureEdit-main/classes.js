class Facture 
{
    constructor (type, number, date, client, totalHT = 0, items = [])
    {
        this.docType = type
        this.docNumber = number
        this.date = date
        this.client = client
        this.totalHT = totalHT
        this.items = items
    }

    // Add an Item object to the document
    addItem (newItem)
    {
        this.items.push(newItem)
        this.totalHT = this.totalHT + newItem.uPriceHT * newItem.quantity
    }
}

class Item
{
    constructor (name, description, quantity, date, uPriceHT)
    {
        this.name = name
        this.description = description
        this.quantity = quantity
        this.date = date
        this.uPriceHT = uPriceHT
    }
}