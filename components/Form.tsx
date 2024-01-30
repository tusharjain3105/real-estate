export const Form = () => {
    return (
        <div className="flex justify-center items-center h-screen pt-10 pb-10">
            <div className="bg-white w-auto h-aotu p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">Reach out to us</h2>
                <h6 className="text-3xl font-bold mb-4">Book Free Consultation</h6>
                <form action="/submit-form-data" method="post" className="space-y-2">
                    <label htmlFor="name" className="block font-medium">Name</label>
                    <input type="text" id="name" name="name" placeholder='Name' className="w-full p-2 border rounded-lg" required />

                    <label htmlFor="email" className="block font-medium">Email</label>
                    <input type="email" id="email" name="email" placeholder='Email' className="w-full p-2 border rounded-lg" />

                    <label htmlFor="phone" className="block font-medium">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder='Phone' className="w-full p-2 border rounded-lg" required />

                    <label htmlFor="whatsapp" className="block font-medium">WhatsApp Number</label>
                    <input type="tel" id="whatsapp" name="whatsapp" placeholder='WhatsApp Number' className="w-full p-2 border rounded-lg" />
                     
                    <input type="checkbox" />
                    <label htmlFor="privacy"> term /condition</label>
                     
                    <div>
                        <input type="submit" className="w-full p-3 bg-orange-500 hover:bg-orange-600  text-white rounded-lg cursor-pointer hover-orange-800" />
                    </div>
                </form>
            </div>
        </div>
    )
}
