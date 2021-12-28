import { useEffect } from 'react';

const Returns = () => {
    useEffect(() => {
        document.body.style.background = "linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, .8)), url('/books.png')"
        document.body.style.backgroundRepeat = 'repeat-y';
        document.body.style.backgroundSize = '100vh 100%';
        document.body.style.backgroundPosition = 'left 80px';
        return () => {
          document.body.style.background = "linear-gradient(rgba(255, 255, 255, .1), rgba(255, 255, 255, .1)) url('/books.png')"
          document.body.style.backgroundRepeat = 'repeat-y';
          document.body.style.backgroundSize = '100vh 100%';
          document.body.style.backgroundPosition = 'left 80px';
        }
      }, []);
    return (
        <div>
            <div className="main-wrap p-tb-20">
              <h2>Return Policy</h2>
                <div><p>Our policy lasts 7 days. If 7 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</p><p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p><p>Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.</p><p>Additional non-returnable items:</p><ul><li>Gift cards</li><li>Downloadable software products</li></ul><p>To complete your return, we require a receipt or proof of purchase.</p><p>Please do not send your purchase back to the manufacturer.</p><p>There are certain situations where only partial refunds are granted: (if applicable)</p><p>Book with obvious signs of use</p><p>CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened.</p><p>Any item not in its original condition, is damaged or missing parts for reasons not due to our error.</p><p>Any item that is returned more than 7 days after delivery</p><p>Refunds (if applicable)</p><p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p><p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days. </p><p>Late or missing refunds (if applicable)</p><p>If you haven’t received a refund yet, first check your bank account again.</p><p>Then contact your credit card company, it may take some time before your refund is officially posted.</p><p>Next contact your bank. There is often some processing time before a refund is posted.</p><p>If you’ve done all of this and you still have not received your refund yet, please contact us at <strong>iskconpunesankirtan@gmail.com</strong>.</p><p>Sale items (if applicable)</p><p>Only regular priced items may be refunded, unfortunately sale items cannot be refunded.</p><p>Exchanges (if applicable)</p><p>We only replace items if they are defective or damaged.  If you need to exchange it for the same item, send us an email at iskconpunesankirtan@gmail.com and send your item to: <strong>ISKCON NVCC, Off Katraj-Kondhwa Bypass Rd, Kondhwa (Bk), Pune-411048</strong>.</p><p>Gifts</p><p>If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.</p><p>If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.</p><p>Shipping</p><p>To return your product, you should mail your product to: <strong>ISKCON NVCC, Off Katraj-Kondhwa Bypass Rd, Kondhwa (Bk), Pune-411048</strong>.</p><p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p><p>Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</p><p>If you are shipping an item over ₹5000/-, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p></div>
            </div>
        </div>
    )
}

export default Returns;