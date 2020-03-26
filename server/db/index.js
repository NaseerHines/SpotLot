const { Client, Pool } = require('pg');

// Creates new pool
const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  database: "spotlot"
})

// Connects pool to DB
pool.connect()
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err))

//
//USER
//

const addUser = ({ name, email, google_token, image_url, bio }) => {
  const query = 'INSERT INTO "user" (name, email, google_token, image_url, bio) VALUES ($1, $2, $3, $4, $5)'
  return pool.query
  (query,
    [name, email, google_token, image_url, bio ])
  }
  
  const deleteUser = (id) => {
    const query = 'DELETE FROM "user" WHERE id = $1'
    return pool.query(query, [id])
}

const allUsers = () => {
  const query = 'SELECT * FROM "user"';
  return pool
    .query(query)
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
};

const userLots = (id) => {
  const query = 'SELECT * FROM "lot" WHERE owner_id = $1';
  return pool
    .query(query, [id])
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
};

const selectUser = (email) => {
  const query = 'SELECT * FROM "user" WHERE email = $1'
  return pool.query(query, [email])
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
}

const patchUser = (id, body) => {
  const { name, email, google_token, image_url, bio, billing_info } = body;
}

//VEHICLE

const addVehicle = (user_id, { make, model, color, plate, state }) => {
  const query = "INSERT INTO vehicle (user_id, make, model,license_plate, color, state) VALUES ($1, $2, $3, $4, $5, $6)"
  return pool.query(query, [user_id, make, model, color, plate, state])
}

const selectVehicle = id => {
  const query = "SELECT * FROM vehicle WHERE id = $1"
  return pool.query(query, [id])
}

const deleteVehicle = id => {
  const query = 'DELETE FROM vehicle WHERE id = $1'
  return pool.query(query, [id])
}

const deleteAllUserVehicles = (user_id) => {
  const query = 'DELETE FROM vehicle WHERE user_id = $1'
  return pool.query(query, [user_id])
}

const patchVehicle = (id, body) => {
  const { make, model, color, plate, state } = body;
}

//
//LOT
//

const addLot = ({ owner_id, image_url, price, longitude, latitude, is_open, lot_close, max_reserve, max_spots, current_spots, description }) => {
  const query = "INSERT INTO lot (owner_id, image_url, price, longitude, latitude, is_open, lot_close, max_reserve, max_spots, current_spots, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)"
  return pool.query(
    query,
    [owner_id, image_url, price, longitude, latitude, is_open, lot_close, max_reserve, max_spots, current_spots, description]
  )
}

const allLots = () => {
  const query = 'SELECT * FROM "lot"';
  return pool
    .query(query)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      return error;
    });
};

const selectLot = (id) => {
  const query = "SELECT * FROM lot WHERE owner_id = $1"
  console.log(id);
  return pool.query(query, [id])
}

const deleteLot = (id) => {
  const query = 'DELETE FROM lot WHERE id = $1'
  return pool.query(query, [id])
}

const patchLot = (id, body) => {
  const {
    owner_id,
    image_url,
    price,
    longitude,
    latitude,
    is_open,
    lot_close,
    max_reserve,
    max_spots,
    current_spots,
    description
  } = body;
}

//
//SPOT
//

const addSpot = (lot_id, user_id) => {
  const query = 'INSERT INTO spot (lot_id, user_id) VALUES ($1, $2)'
  return pool.query(query, [lot_id, user_id])
}

const selectSpot = id => {
  const query = "SELECT * FROM spot WHERE id = $1"
  return pool.query(query, [id])
}

const deleteSpot = id => {
  const query = 'DELETE FROM spot WHERE id = $1'
  return pool.query(query, [id])
}

const patchSpot = (lot_id, user_id) => {
  //update query for current person in a spot
}

const reserveSpot = id => {
  const query = 'UPDATE lot SET current_spots = current_spots + 1 WHERE id = $1'
  return pool.query(query, [id])
}

//
//REVIEW
//

const addReview = (user_id, lot_id, rating, desc) => {
  const query = 'INSERT INTO spot (user_id, lot_id, rating, desc) VALUES ($1, $2, $3, $4)'
  return pool.query(query, [lot_id, user_id, rating, desc])
}

const selectReview = lot_id => {
  const query = "SELECT * FROM review WHERE lot_id = $1"
  return pool.query(query, [lot_id]);
}

const patchReview = (id) => {

}

module.exports = {
  // pool
  pool,
  //USER
  addUser,
  allUsers,
  selectUser,
  userLots,
  deleteUser,
  patchUser,
  //VEHICLE
  addVehicle,
  selectVehicle,
  deleteVehicle,
  deleteAllUserVehicles,
  patchVehicle,
  //SPOT
  addSpot,
  selectSpot,
  deleteSpot,
  patchSpot,
  reserveSpot,
  //LOT
  addLot,
  allLots,
  selectLot,
  deleteLot,
  patchLot,
  //REVIEW
  addReview,
  selectReview,
  patchReview
}