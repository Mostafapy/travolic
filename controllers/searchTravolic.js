const asyncHandler = require('../middlewares/async');
const axios = require('axios').default;
const dateFormat = require('./../helpers/dateFormat');
const { OK, INTERNAL_SERVER_ERROR} = require('http-status-codes');
const logger = require('../utils/logger')('SearchTravolicController');
/**
 * @route /search/travolic
 * @method POST
 */
module.exports = asyncHandler(async (req, res) => {
    try {
       const  { tripId, cabinClass, legs, adults, childrens, infants } = req.body;

       let selectedCabins;
    
       if (cabinClass === 'Economy') {
           selectedCabins = 'M';
       } else if (cabinClass === 'First Class') {
           selectedCabins = 'F';
       } else if (selectedCabins === 'Business') {
           selectedCabins = 'C';
       } else {
           // economy premium
           selectedCabins = 'W'
       }

        const response = await axios.get(`https://tequila-api.kiwi.com/v2/search?apikey= m8dcJMH9DzC6E9GTTdNgtlA8Wu9bp9li
        &fly_from=${legs[0].origin}fly_to=${legs[0].destination}&date_from=${dateFormat(legs[0].departure)}&date_to=${dateFormat(legs[0].departure)}&return_from=${dateFormat(legs[1].departure)}&return_to=${dateFormat(legs[1].departure)}&max_fly_duration=20&fligh
        t_type=${tripId}&adults=${adults}&chidrens=${childrens}&infants=${infants}&selected_cabins=${selectedCabins}&mix_with_cabins=${selectedCabins}&partner_market=us&max_stopovers=2&max_s
        ector_stopovers=2&vehicle_type=aircraft`)

        return res.status(OK).json({
          success: false,
          data: response
        });
    } catch (err) {
        logger.error(err.stack);
        return res.status(INTERNAL_SERVER_ERROR).json({
            success: false,
            data: null,
        });
    }
});