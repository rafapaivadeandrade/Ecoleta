import React,{useEffect,useState,ChangeEvent,FormEvent} from 'react';
import './index.css';
import  {Link,useHistory} from 'react-router-dom';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {FiArrowLeft} from 'react-icons/fi';
import logo from "../../assets/logo.svg";
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';
import Dropzone from '../../components/Dropzone';

const CreatePoint = () =>{
        const history = useHistory();
        const[items,setItems] = useState<Item[]>([]);
        const[provinces,setProvinces] = useState<string[]>([]);
        const[selectedProvince,setSelectedProvince] = useState('0');
        const[cities,setCities] = useState<string[]>([]);
        const[selectedCity,setSelectedCity] = useState('0');
        const[selectedItems,setSelectedItems] = useState<number[]>([])
        const[selectedPosition,setSelectedPosition] = useState<[number,number]>([0,0]);
        const[initialPosition,setInitialPosition] = useState<[number,number]>([0,0]);
        const[formData, setFormData] = useState({
            name: '',
            email: '',
            whatsapp: '',
        });
        const[selectedFile,setSelectedFile] = useState<File>();
        
        interface Item{
            id:number,
            title:string,
            image_url:string,
        }
        interface Province{
            sigla:string,
        }

        interface ProvinceCity{
            nome:string,
        }
        useEffect(()=>{
            navigator.geolocation.getCurrentPosition(position => {
                const{latitude,longitude} = position.coords

                setInitialPosition([latitude,longitude])
            })
        })

        useEffect(() => {
            if(selectedProvince === '0'){
                return;
            };
            
            axios.get<ProvinceCity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedProvince}/municipios`).then(response => {
                const cityNames = response.data.map(province =>  province.nome);
                setCities(cityNames);
            })
        },[selectedProvince]);

        useEffect(() =>{
            api.get('items').then(response => {
                setItems(response.data);
            })
        },[]);

        useEffect(() => {

            axios.get<Province[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const provincesInitials = response.data.map(province =>  province.sigla );

                setProvinces(provincesInitials);
            })

        },[]);

        function handleSeletectedProvince(event: ChangeEvent<HTMLSelectElement>){
                const selectedProvince = event.target.value;
                console.log(selectedProvince)
                setSelectedProvince(selectedProvince);
        }
        function handleSeletectedCity(event: ChangeEvent<HTMLSelectElement>){
                const city = event.target.value;
                setSelectedCity(city);
        }
        function handleMapClick(event:LeafletMouseEvent){
            setSelectedPosition([
                event.latlng.lat,
                event.latlng.lng,
            ])
        }
        function handleInputChange(event: ChangeEvent<HTMLInputElement>){
            const{name,value} = event.target
            setFormData({...formData,[name]:value})
        }
        function handleSelectItem(id: number){
                const alreadySelected = selectedItems.findIndex(item=>
                    item === id)

                if(alreadySelected >= 0){
                    const filteredItems = selectedItems.filter(item => item !== id)

                    setSelectedItems(filteredItems)
                }
                else{
                    setSelectedItems([...selectedItems,id]);
                }
        }
            async function handleSubmit(event:FormEvent){
            event.preventDefault()

            const {name,email,whatsapp} = formData
            const province = selectedProvince
            const city = selectedCity
            const[latitude,longitude] = selectedPosition
            const items = selectedItems

            const data = new FormData();

            
                data.append('name',name);
                data.append('email',email);
                data.append('whatsapp',whatsapp);
                data.append('province',province);
                data.append('city',city);
                data.append('latitude', String(latitude));
                data.append('longitude',String(longitude));
                data.append('items',items.join(','));

                if(selectedFile){
                    data.append('image',selectedFile);
                }
            
            api.post('points',data)

            alert('Collection point created!')

            history.push('/')

        }


    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecolect"/>

                <Link   to="/">
                    <FiArrowLeft/>
                         Back to Home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>
                    Collection Points Registration
                </h1>

                <Dropzone onFileUploaded={setSelectedFile} />

                <fieldset>
                    <legend><h2>Information</h2></legend>

                    <div className="field">
                    <label htmlFor="name">Entity Name</label>
                    <input type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}/>
                </div>

                <div className="field-group">
                <div className="field">
                    <label htmlFor="name">Email Address</label>
                    <input type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}/>
                </div>

                <div className="field">
                    <label htmlFor="name">Whatsapp</label>
                    <input type="text"
                    name="whatsapp"
                    id="whatsapp"
                    onChange={handleInputChange}/>
                </div>
                </div>
                
                </fieldset>

             

                <fieldset>
                    <legend>
                   <h2>Address</h2> 
                    <span>Select Map Address</span>
                         </legend>

                        <Map  center= {[-8.1361664,-34.9049047]} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition}/>
                        </Map>

                         <div className="field-group">
                        <div className="field">
                            <label htmlFor="province">Province</label>
                            <select name="province" id="province"  value={selectedProvince} onChange={handleSeletectedProvince}>
                                <option value="0">Select a Province</option>
                                {provinces.map(province => (

                                <option key = {province}value={province} >{province}</option>

                                ))}
                            </select>
                        </div>

                        <div className="field">
                        <label htmlFor="city">City</label>
                        <select name="city" id="city"  value = {selectedCity}  onChange = {handleSeletectedCity}   >
                        <option value="0">Select a city</option>
                        {cities.map(city=> (
                        <option  key={city}  value={city}>{city}</option>
                        ))}
                        </select>
                    </div>
                    </div>
                    
                </fieldset>
                
                <fieldset>

                    <legend>
                       <h2>Collection Items</h2> 
                    <span>Select one or more items below</span>
                    </legend>

                    <ul className="items-grid">
                        
                    {items.map(item =>  (

                        <li key = {item.id}
                        className={selectedItems.includes(item.id)? 'selected' : ''} 
                        onClick={() => handleSelectItem(item.id)}>
                     <img src={item.image_url} alt={item.title}/>
                            <span>{item.title}</span>
                        </li>
                     ) )}

                        </ul>                    

                    </fieldset>
                    <button type="submit">
                        Register collection points
                    </button>
            </form>
        </div>
    )
}

export default CreatePoint;