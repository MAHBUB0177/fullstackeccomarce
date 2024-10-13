import { getAllDivison, getAreaByCity, getCityByDivision } from '@/service/allApi';
import { Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react'


interface PostData {
  name: string;
  phoneNumber: string;
  houseNo: string;
  postalCode: string;
  division: string;
  city: string;
  area: string;
  address: string;
}

interface ShippingFormProps {
  postData: PostData;
  setPostData: React.Dispatch<React.SetStateAction<PostData>>;
}

interface Division {
  id: number;
  name: string;
  division:string;
  city:string;
  area:string;
}

const ShippingForm = ({ postData, setPostData }: ShippingFormProps) => {

  const [division, setDivision] = useState<Division[]>([]);
  const [cities, setCities] = useState<Division[]>([]);
  const[area,setArea]=useState<Division[]>([])
  const divisionOptions = division.map((item) => ({
    label: item?.name,
    value: item?.name
  }));
  const cityOptions = cities.map((item) => ({
    label: item?.name,
    value: item?.name
  }));
  const areaOptions = area.map((item) => ({
    label: item?.name,
    value: item?.name
  }));
  const getallDivison = async () => {
    try {
      const response = await getAllDivison()
      if (response?.data?.isSuccess) {
        setDivision(response?.data?.item)
      }
    }
    catch (error) {
      console.error('Something went wron');
    }
  }


  const fetchCitiesByDivision = async (division: string) => {
    try {
      const response =await getCityByDivision(division)

      if (response.data.isSuccess) {
        setCities(response.data.item); // Set the fetched cities to state
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Something Went Wrong');
    }
  };

  const fetchAreaByCity = async (city: string) => {
    try {
      const response =await getAreaByCity(city)
    

      if (response.data.isSuccess) {
        setArea(response.data.item); 
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Something Went Wrong');
    }
  };

  
  useEffect(() => {
    getallDivison()
  }, [])
  useEffect(() => {
    if (postData?.division) {
      fetchCitiesByDivision(postData?.division);
    }
  }, [postData?.division]);

  useEffect(() => {
    if (postData.city) {
      fetchAreaByCity(postData.city);
    }
  }, [postData.city]);

  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  items-center   pt-2">

        <div className='mx-3'>
          <p className='pb-2 '>Full Name</p>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Title",
              },
            ]}
          >
            <Input
              className='rounded-none'
              type="text"
              size='large'
              placeholder={"Full Name"}
              value={postData.name}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  name: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>
        <div className='mx-3 '>
          <p className='pb-2'>Region</p>
          <Form.Item
            name="division"
            rules={[
              {
                required: true,
                message: "Please input your Title",
              },
            ]}
          >
            <Select

              size='large'
              placeholder={"IMAGETYPE"}
              value={postData.division}
              onChange={(value) => {
                setPostData({
                  ...postData,
                  division: value,
                });
              }}
              options={divisionOptions}
              style={{
                borderRadius: '0px',
              }}
            />
          </Form.Item>
        </div>

        <div className='mx-3'>
          <p className='pb-2'>Phone Number</p>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your Title",
              },
            ]}
          >
            <Input
              className='rounded-none'
              size='large'
              type="text"
              placeholder={"Phone Number"}
              value={postData.phoneNumber}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  phoneNumber: e.target.value,
                });
              }}

            />
          </Form.Item>
        </div>




        <div className='mx-3'>
          <p className='pb-2'>City</p>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your Title",
              },
            ]}
          >
            <Select
              size='large'
              placeholder={"City"}
              value={postData.city}
              onChange={(value) => {
                setPostData({
                  ...postData,
                  city: value,
                });
              }}
              options={cityOptions}
            />
          </Form.Item>
        </div>

        <div className='mx-3'>
          <p className='pb-2'>House Number</p>
          <Form.Item
            name="houseNo"
            rules={[
              {
                required: true,
                message: "Please input your Title",
              },
            ]}
          >
            <Input
              className='rounded-none'
              type="text"
              size='large'
              placeholder={"House Number"}
              value={postData.houseNo}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  houseNo: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>

        <div className='mx-3'>
          <p className='pb-2'>Area</p>
          <Form.Item
            name="area"
            rules={[
              {
                required: true,
                message: "Please input your Title",
              },
            ]}
          >
            <Select
              size='large'
              placeholder={"IMAGETYPE"}
              value={postData.area}

              onChange={(value) => {
                setPostData({
                  ...postData,
                  area: value,
                });
              }}
              options={areaOptions}
            />


          </Form.Item>
        </div>



        <div className='mx-3'>
          <p className='pb-2'>Postal Code</p>
          <Form.Item
            name="postalCode"
            rules={[
              {
                required: true,
                message: "Please input your Title",
              },
            ]}
          >
            <Input
              className='rounded-none'
              type="text"
              size='large'
              placeholder={"Postal Code"}
              value={postData.postalCode}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  postalCode: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>





        <div className='mx-3'>
          <p className='pb-2'>Address</p>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Title",
              },
            ]}
          >
            <Input
              className='rounded-none'
              type="text"
              size='large'
              placeholder={"Full Name"}
              value={postData.address}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  address: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>


      </div>
    </div>
  )
}

export default ShippingForm