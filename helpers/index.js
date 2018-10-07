'use strict';

//var contacts = require('../contacts.json');
var mongoose = require('mongoose');

mongoose.connect('mongodb://Monika:work04%402018@ds135156.mlab.com:35156/contactdb');

mongoose.connection.on('open',function(){
  console.log('Connected to mongoDB');
});

var localContacts;


var ContactSchema = new mongoose.Schema({
  id:Number,
  firstName:String,
  lastName:String,
  email:String,
  phoneNumber:Number,
  status:String
});

var contacts = mongoose.model('contacts',ContactSchema);

var getContacts= function(res){
  contacts.find({},function(err,contacts){
    localContacts=contacts;
    res.json(JSON.parse(JSON.stringify(contacts)));
  });
};

var getContactById= function(id, res){
  contacts.findOne({id:id},function(err, getOneRes){
    return res.json(JSON.parse(JSON.stringify(getOneRes)));
  });
};

var deleteContact = function(id,res){
  contacts.updateOne({id:id}, {$set:{status:'Inactive'}}, function(err,deleteRes){
    if(!err){
        return res.json(JSON.parse(JSON.stringify(deleteRes)));
    }
  })
};

var editContact= function(contact, res){
    contacts.updateOne({id:contact.id}, contact, function(err,updatedRes){
      if(!err){
        return res.json(JSON.parse(JSON.stringify(updatedRes)));
      }
    });
};


var addContact= function(contact,res){
  if(typeof localContacts !== 'undefined' && localContacts.length>0)
    contact.id=localContacts[localContacts.length-1].id+1;
  else
    contact.id=1;
  var newContacts=new contacts(contact);
  //contacts.push(contact);
  //contacts.contact=contact;
  newContacts.save(function(err, addRes){
    if(err){
      return err;
    }
    res.json(JSON.parse(JSON.stringify(addRes)));
  });
};

module.exports= {
  getContacts,
  getContactById,
  deleteContact,
  editContact,
  addContact
}
