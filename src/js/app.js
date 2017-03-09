var React = require('react');
var ReactDOM = require('react-dom');
let datas = require('./data');


let Title = (props)=>{
  return (
    <div className="title">{props.title}</div>
  );
}
let Stars = (count)=>{
  let star = [];
  let className = "item"
  for(var i = 0; i < 5; i++){
    if(i >= count){
      className += " item--empty";
    }
    star.push(<a href="#" className={className}>x</a>);
  }
    return star;
}
let Image = (props)=>{
  return(
    <div className="img" style={{"backgroundImage": "url('"+props.url+"')"}}></div>
  );
}
let Price = (props)=>{
  return (
      <div className="price">{props.price}$</div>
  );
}
let IconButton = (props)=>{
  return (
    <button className="close" type="button" onClick={props.onClick} >&#215;</button>
  );
}
let Button = (props)=>{
  return (
    <button className="btn-selected" type="button">{props.text}</button>
  );
}
let Address = (props)=>{
  return (
      <div className="address">{props.address}</div>
  );
}
let ButtonAddHotel = (props)=>{

  return (
    <button className="addHotel" type="button" onClick={props.onClick}>{props.text}</button>
  );
}
let FormHotel= (props)=>{
    let className = "formAdd ";
    console.log(props.show);
    if(props.show == true) className+="show";
    return (
      <div className={className}>
        <IconButton  onClick={props.close}/>
          <form action="/" id={"form"}>
            <label htmlFor={"#h_name"}>Hotel name</label>
            <input type="text" placeholder="Hotel name" onBlur={props.onChangeName} name="name" id={"h_name"}/>
            <label htmlFor={"#start"}>Stars</label>
            <input type="number" placeholder="Stars" onBlur={props.onChangeStar} name="start" max="5" min="0" id={"start"}/>
            <label htmlFor={"#price"}>Price</label>
            <input type="number" placeholder="Price " onBlur={props.onChangePrice} name="price" id={"price"}/>
            <label htmlFor={"#address"}>Address</label>
            <input type="text" placeholder="Hotel Address" onBlur={props.onChangeAddres} name="address"   id={"address"}/>
            <label htmlFor={"#color"}>Image hotel</label>
            <input type="file" name="color"  onBlur={props.onChangeFile} id={"color"}/>
            <button type="button" name="button" onClick={()=>{
              let close = props.add.call();
              if(close) props.close.call();

            }} id={"addHotel"}>Add</button>
          </form>
      </div>
    );
}
let Hotel = (props)=>{
  return (
    <section className={"hotel"}>
      {props.children}
    </section>
  )
}
var set = "formAdd";
function IDloop(id, to){
  console.log(id);
  if(id < to){
    id++;
    return IDloop(id);
  }
  return id;
}

class Apper extends React.Component {
  constructor(props) {
    super(props);
    this.tempHotel={
      id: '',
      name: '',
      address: '',
      start: '',
      price: '',
      image: ''
    }
    this.state = {
      data: datas,
      forms:false,
      togle: true,
      text: '',

    };
    this.handleClick = this.handleClick.bind(this);
  }
  tesxt(e){
      this.setState({
        togle: !this.state['togle']
      });
  }
  handleClick(id){
    console.log("handleClick");
    console.log(event);
    let newData = this.state.data.filter((item)=>{
      return item.id != id;
    });
    this.setState({data: newData});
  }
  AddHotelButtonClick(){
    if(this.state.form){
      this.setState({form: false});
    }else{
      this.setState({form: true});
    }
  }

  AddHotel(event){
    let id = this.state.data.length + 1;
    id = IDloop(id,this.state.data.length);
    alert(this.state.data.length+"/"+id)
    this.tempHotel.id = id;
    if(this.tempHotel.name != '' && this.tempHotel.address != '' && this.tempHotel.start != ''  && this.tempHotel.price != ''){
      let newData = this.state.data.slice();
      newData.push(this.tempHotel);
      this.setState({data: newData});
      return true;
    }else{
      alert("incorect input data, please enter new datas!!! ")
      return false;
    }

  }

  onChangeStar(e){
    let elem = e.target.value;
    console.log(elem);
    this.tempHotel.start = elem;
  }
  onChangePrice(e){
    let elem = e.target.value;
    this.tempHotel.price = elem;
  }
  onChangeFile(e){
    let elem = e.target.value;
    this.tempHotel.image = elem;
  }
  onChangeAddres(e){
    let elem = e.target.value;
    this.tempHotel.address = elem;
  }
  onChangeName(e){
    let elem = e.target.value;
    this.tempHotel.name = elem;
  }
  render(){
    console.log("render");
    let data = this.state.data.map((item)=>{
      return (
        <Hotel key={item.id} >
          <Image url={item.image} />
          <div className={"hotel_info"}>
            <Title title={item.name} />
            <div className={"stars"}>
            {Stars(item.start)}
            </div>
            <Price price={item.price}/>
            <Address address={item.address}/>
          </div>
          <Button  text="Select" />
          <IconButton onClick={this.handleClick.bind(this,item.id)}/>
        </ Hotel>
      );
    })
    return (
      <div>
        <ButtonAddHotel text="Add Hotel" onClick={this.AddHotelButtonClick.bind(this)}/>
        <FormHotel show={this.state.form}
                    onChangeStar={this.onChangeStar.bind(this)}
                    onChangePrice={this.onChangePrice.bind(this)}
                    onChangeFile={this.onChangeFile.bind(this)}
                    onChangeAddres={this.onChangeAddres.bind(this)}
                    onChangeName={this.onChangeName.bind(this)}
                    add={this.AddHotel.bind(this)}
                    close={this.AddHotelButtonClick.bind(this)}/>
        <div className={'hotels'} children={data}>

        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Apper />,
  document.getElementById('main-container')
);
