const mongoose  = require('mongoose');

const config_data=()=>mongoose.connect(process.env.DB_URL,
                    {useNewUrlParser:true,useUnifiedTopology:true})
                    .then(()=>console.log('mongosse connected'))
                    .catch((err)=>{console.log(err)
                                   process.exit(1)})


module.exports=config_data;