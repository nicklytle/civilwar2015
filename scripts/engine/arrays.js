define({
  removeElement: function(array, element) {
    for( var i = 0; i < array.length; i ++ )
    {
      var found = array[i];
      if(found === element)
      {
        array.splice(i,1);
        return true;
      }
    }
    return false;
  },
  containsElement: function(array,element) {
    return array.indexOf(element) != -1;
  },
});