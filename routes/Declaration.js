const express=require('express')
const {createdeclarationValidator,
      deletedeclarationValidator
      ,
    
      getdeclarationValidator,
      updatedeclarationValidator
       }=require('../utils/validators/declarationValidator');


const {getdeclaration,createdeclaration,deletedeclaration,updatedeclaration,getAlldeclaration
    }=require('../controllers/declarationService');

 const router = express.Router()


router.route('/').get(getAlldeclaration)
                 .post(createdeclarationValidator,createdeclaration);

router.route('/:id').get(getdeclarationValidator,getdeclaration)
                    .put(updatedeclarationValidator,updatedeclaration)
                    .delete(deletedeclarationValidator,deletedeclaration);
module.exports = router;