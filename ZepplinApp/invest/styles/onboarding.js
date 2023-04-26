import * as flexbox from './flexbox.js'  
  

const text_title = { 
      fontSize: 20, 
      lineHeight: 35,
      fontWeight: "400", 
  }

  const text_body = { 
      fontSize: 14, 
  }

  const text_smallest = { 
    fontSize: 12, 
}

  const footer_button_container = {
      position: 'absolute',
      bottom: 10,
      width: '100%',
      height: '10%',
      backgroundColor: 'red'
  }

  const footer_button = {
      borderRadius: 20, 
      backgroundColor:'#142C8E',
      width: '90%',
  }

  const footer_button_disabled = {
    borderRadius: 20, 
    backgroundColor:'gray',
    width: '90%',
}

  const button_text = {
    color: 'white',
    fontSize: 14,
    fontWeight: "500", 
  }

  const text_body_container = {
    height: '90%',
    width: '90%',
  }

  const main_container = {
    height: "100%",
    backgroundColor: "white",
    padding: 15,
    // marginLeft: 10,
    // marginRight: 10,

    ...flexbox.flex_col_start_center,
    
  }



export {
  text_title,
  text_body,
  footer_button_container,
  footer_button,
  button_text,
  text_body_container,
  footer_button_disabled,
  main_container,
  text_smallest,
}