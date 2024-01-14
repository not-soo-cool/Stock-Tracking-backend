import { User } from "../model/User.js";
import { Order } from "../model/Order.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middlewares/sendMail.js";
import cloudinary from "cloudinary";

// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     user = await User.create({
//       name,
//       email,
//       password,
//     });

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

//     res
//       .status(201)
//       .cookie("token", token, {
//         expires: new Date(Date.now() + 90*24*60*60*1000),
//         httpOnly: true,
//       })
//       .json({
//         success: true,
//         user,
//         token,
//       });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90*24*60*60*1000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addTiles = async (req, res) => {
  try {
    const { tiles } = req.body;

    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    tiles.forEach(tile => {
      user.tiles.push(tile);
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Tiles",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addMarbles = async (req, res) => {
  try {
    const { marbles } = req.body;

    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    marbles.forEach(marble => {
      user.marbles.push(marble);
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Marbles",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTiles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const tiles = user.tiles;

    res.status(200).json({
      success: true,
      tiles,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getMarbles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const marbles = user.marbles;

    res.status(200).json({
      success: true,
      marbles,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getTile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    let tile = -1;
    user.tiles.forEach(elem => {
      if(elem._id.toString() === req.params.id){
        tile = elem;
        return;
      }
    });

    if(tile === -1){
      return res.status(404).json({
        success: false,
        message: "Tile not found"
      })
    }

    res.status(200).json({
      success: true,
      tile,
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getMarble = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    let marble = null;
    user.marbles.forEach(elem => {
      if(elem._id.toString() === req.params.id){
        marble = elem;
        return;
      }
    });

    if(!marble){
      return res.status(404).json({
        success: false,
        message: "Marble not found"
      })
    }

    res.status(200).json({
      success: true,
      marble,
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateTile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    let ind = -1;
    user.tiles.forEach((elem, index) => {
      if(elem._id.toString() === req.params.id){
        ind = index;
        return;
      }
    });

    if(ind === -1){
      return res.status(404).json({
        success: false,
        message: "Tile not found"
      })
    }

    const { title, size, quantity } = req.body;

    if(title) user.tiles[ind].title = title;
    if(size) user.tiles[ind].size = size;
    if(quantity) user.tiles[ind].quantity = quantity;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Tile info updated"
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateMarble = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    let ind = -1;
    user.marbles.forEach((elem, index) => {
      if(elem._id.toString() === req.params.id){
        ind = index;
        return;
      }
    });

    if(ind === -1){
      return res.status(404).json({
        success: false,
        message: "Marble not found"
      })
    }

    const { title, size, quantity } = req.body;

    if(title) user.marbles[ind].title = title;
    if(size) user.marbles[ind].size = size;
    if(quantity) user.marbles[ind].quantity = quantity;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Marble info updated"
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const deleteTile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    let ind = -1;
    user.tiles.forEach((elem, index) => {
      if(elem._id.toString() === req.params.id){
        ind = index;
        return;
      }
    });

    if(ind === -1){
      return res.status(404).json({
        success: false,
        message: "Tile not found"
      })
    }

    user.tiles.splice(ind, 1);

    await user.save();

    res.status(200).json(({
      success: true,
      message: "Tile info deleted"
    }))
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteMarble = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    let ind = -1;
    user.marbles.forEach((elem, index) => {
      if(elem._id.toString() === req.params.id){
        ind = index;
        return;
      }
    });

    if(ind === -1){
      return res.status(404).json({
        success: false,
        message: "Tile not found"
      })
    }

    user.marbles.splice(ind, 1);

    await user.save();

    res.status(200).json(({
      success: true,
      message: "Marble info deleted"
    }))
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getAllTiles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const { value } = req.body;

    const tiles = user.tiles.filter(item => item.title.includes(value));

    // console.log(tiles);

    res.status(200).json({
      success: true,
      tiles,
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    }) 
  }
}

export const getAllMarbles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const { value } = req.body;

    const marbles = user.marbles.filter(item => item.title.includes(value));

    res.status(200).json({
      success: true,
      marbles,
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    }) 
  }
}

export const checkTiles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const { title, size } = req.body;

    if(!user.tiles.some(elem => elem.title === title)){
      return res.status(404).json({
        success: false,
        message: "Tile not found"
      })
    }

    if(!user.tiles.some(elem => elem.size === size)){
      return res.status(404).json({
        success: false,
        message: "Size not available"
      })
    }

    const quantity = user.tiles.find(elem => elem.title === title && elem.size === size).quantity

    res.status(200).json({
      success: true,
      quantity,
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const checkMarbles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const { title, size } = req.body;

    if(!user.marbles.some(elem => elem.title === title)){
      return res.status(404).json({
        success: false,
        message: "Marble not found"
      })
    }

    if(!user.marbles.some(elem => elem.size === size)){
      return res.status(404).json({
        success: false,
        message: "Size not available"
      })
    }

    const quantity = user.marbles.find(elem => elem.title === title && elem.size === size).quantity

    res.status(200).json({
      success: true,
      quantity,
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const { dataRows } = req.body;
    let i;
    let sum = 0;

    dataRows.forEach((element, index) => {
      sum = sum + Number(element.quantity);
    });

    const newOrder = await Order.create({
      orders: dataRows, 
      owner: req.user._id,
      items: dataRows.length,
      amount: sum,
    });

    user.orders.unshift(newOrder._id);

    dataRows.forEach(element => {
      if(element.prod === 'Tiles'){
        i = user.tiles.findIndex(elem => elem.title === element.title && elem.size === element.size);
        user.tiles[i].quantity -= element.quantity;
      }
      else{
        i = user.marbles.findIndex(elem => elem.title === element.title && elem.size === element.size);
        user.marbles[i].quantity -= element.quantity;
      }
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Stock Updated"
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if(!orders){
      return res.status(404).json({
        success: false,
        message: "Orders not found"
      })
    }
    
    res.status(200).json({
      success: true,
      orders: orders.reverse(),
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const viewOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }

    // let order = user.orders.find(element => element._id.toString() === req.params.id);

    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }

    res.status(200).json({
      success: true,
      order,
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const contact = async (req, res) => {
  try {
    const { name, email, num, subj, msg } = req.body;

    const userMessage = `Hey, I am ${name}. My email is ${email} and my number is ${num}. In case you don't have time to read the full email, the subejct of the email is: ${subj}. And my full message is ${msg}.`;

    await sendMail({
      email,
      userMessage,
    });

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const dateOrders = async (req, res) => {
  try {
    
    const { date } = req.body;
    let day, month, year;
    const parts = date.split("/");
    if(parts.length > 0) day = Number(parts[0]);
    if(parts.length > 1) month = Number(parts[1]);
    if(parts.length > 2) year = Number(parts[2]);

    const orders = await Order.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: "$createdAt" }, day] },
          { $eq: [{ $month: "$createdAt" }, month] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      },
    });

    res.status(200).json({
      success: true,
      orders: orders.reverse(),
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

