const returnInputObject = (elementType, type, placeholder,validation={required:true}) => {
	return {
		elementType:elementType,
		elementConfig:{
			type:type,
			placeholder:placeholder
		},
		value:'',
		validation:validation,
		valid:false,
		touched:false
	}
}

export default returnInputObject;