const Booking = require('../models/booking');

// Create a booking
exports.createBooking = async (req, res) => {
  const { pickup, dropoff, date } = req.body;
  const userId = req.user;

  try {
    if (!pickup || !dropoff || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBooking = new Booking({
      user: userId,
      pickup,
      dropoff,
      date,
    });

    await newBooking.save();
    res.status(200).json({ message: 'Booking successful!', newBooking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get booking history
exports.getBookingHistory = async (req, res) => {
  const userId = req.user;

  try {
    const bookings = await Booking.find({ user: userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
