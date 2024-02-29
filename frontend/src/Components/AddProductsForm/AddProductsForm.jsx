import React, { useState, useEffect } from "react";
import "./AddProductsForm.css";
import { Form, Input, InputNumber, Select, Button, Space, Upload } from "antd";
import { DeleteFilled, PlusOutlined, InboxOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import Tags from "./Tags/Tags";
import AxiosInstance from "../../Utils/axios/axiosConfig";

function AddProductsForm() {
  //form to add products
  const [categories, setCategories] = useState([]);             //state to store categories from backend
  const [selectedCategory, setSelectedCategory] = useState();   //state used to find subcategory
  useEffect(() => {
    getData();                                                  //function to fetch the data from 
  }, []);                                                       //backend
  const handleChange = (value) => {                             //function to find the 
    categories?.categories                                      //selected category's id  
      ?.filter((item) => item.name === value)
      .map((item) => {
        setSelectedCategory(item._id);
      });
  };

  const onFinish = async(values) => {
    const id=selectedCategory
    const token = localStorage.getItem("token");
    let formData=new FormData()                                 //formData to be sent to the server
    formData.append('name',values.product.name)                 //on clicking the save changes button  
    formData.append('detailHeader',values.product.details_name)
    formData.append('price',values.product.product_price)           
    formData.append('description',values.product.description)
    formData.append('stock',values.product.stock)
    formData.append('category',id)
    formData.append('key',values.product.spec)
    formData.append('value',values.product.values)
    // formData.append('key',values.users[0].specvalue)
    // formData.append('value',values.users[1].specvalues)
    // values.users.forEach((file)=> formData.append('key',file.specvalue))
    // formData.append('product',values.product)
    values.dragger.forEach((file)=> formData.append('productPicture',file.originFileObj))
    console.log(formData);
    const addProductDetails = await AxiosInstance.post('/product/',formData,             //Posting formdata to server
    {
        headers: { Authorization: `Bearer ${token}`,}         
    }).then(res=>{
      console.log(res);
    })
  };
  const getData = async () => {
    const token = localStorage.getItem("token");
    await AxiosInstance.get("/category/list", {                      //Getting category data from server
      Headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      console.log(response.data);
      setCategories(response.data);                            
    });
  };

  const [form] = Form.useForm(); //form values accessing
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div className="product-form">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        name="add-address"
        validateMessages
        autoComplete="off"
      >
        <div className="form-main-container">
          <div className="form-container">
            <p className="add-product-header">Product Details</p>
            <div className="product-main-description">
              <div className="product-main-details">
                <Form.Item
                  name={["product", "name"]}
                  label="Product Name"
                  rules={[
                    {
                      required: true,
                      message: "Name is required!",
                    },
                  ]}
                >
                  <Input placeholder="Product Name" style={{ width: 300 }} />
                </Form.Item>
                <Form.Item
                  name={["product", "details_name"]}
                  label="Product Detail Name"
                  rules={[
                    {
                      required: true,
                      message: "Detail is required!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Product Detail Name"
                    style={{ width: 300 }}
                  />
                </Form.Item>
              </div>
              <Form.Item
                style={{ width: 700 }}
                name={["product", "description"]}
                label="Product Description"
              >
                <ReactQuill placeholder="Product Description" />
              </Form.Item>
            </div>
            <div className="vendor-product-categories">
              <p className="add-product-header">Product Details</p>
              <div className="product-category-list">
                <div className="product-main-details">
                  <Form.Item name={["product", "category"]} label="Category">
                    <Select
                      style={{ width: 300 }}
                      value="Clothing"
                      placeholder="Category"
                      onChange={handleChange}
                    >
                      {categories?.categories                 //Displaying parent categories from the server
                        ?.filter((item) => !item.parentId)
                        .map((item) => {
                          return (
                            <option key={item._id} value={item.name}></option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["product", "sub_category"]}
                    label="Sub Category"
                  >
                    <Select
                      style={{ width: 300 }}
                      value="Nice"
                      placeholder="Sub Category"
                    >
                      {categories?.categories                                     //Displaying child categories from server
                        ?.filter((item) => item.parentId === selectedCategory)
                        .map((item) => {
                          return (
                            <option key={item._id} value={item.name}></option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </div>
                <Form.Item name={["product", "category-tag"]} label="Tags">
                 
                  <Tags />
                </Form.Item>
              </div>
            </div>
            <div className="vendor-product-categories">
              <p className="add-product-header">Specification</p>
              <div className="product-category-list">
                <div className="product-main-details">
                  <Form.Item
                    name={["product", "spec"]}
                    label="Spec"
                    rules={[
                      {
                        required: true,
                        message: "Name is required!",
                      },
                    ]}
                  >
                    <Input placeholder="spec name" style={{ width: 300 }} />
                  </Form.Item>
                  <div className="spec-values">
                    <Form.Item name={["product", "values"]} label="Values">
                      <Form.Item name={["values", "value1"]}>
                        
                        <Input
                          placeholder="select values"
                          style={{ width: 300 }}
                        />
                      </Form.Item>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <div className="product-category-list">
                          <div className="product-main-details">
                <Form.Item
              label="specifications"
                  {...restField}
                  name={[name, 'specvalue']}
                  
                >
                  <Input  placeholder="spec name" style={{ width: 300, marginRight: 90 }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'specvalues']}
                  label="Values"
                  
                >
                  <Input 
                    placeholder="select values"
                    style={{ width: 300 }} />
                </Form.Item>
                </div>
                </div>
                <DeleteFilled
                        className="spec-delete-button"
                        onClick={() => remove(name)}
                      />

              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
              {/* <Form.List
              name='specification'
                style={{ marginTop: 300 }}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        className="form-space"
                        key={key}
                        style={{ name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <div className="product-category-list">
                          <div className="product-main-details">
                            <Form.Item
                              name={["add_specs","add_spec"]}
                              label="Specs value"
                             
                            >
                              <Input
                                placeholder="spec name"
                                style={{ width: 300, marginRight: 90 }}
                              />
                            </Form.Item>
                            <div className="spec-values">
                            <Form.Item name={["values", "value1"]}>
                        
                        <Input
                          placeholder="select values"
                          style={{ width: 300 }}
                        />
                      </Form.Item>
                            </div>
                          </div>
                        </div>
                        <DeleteFilled
                          className="spec-delete-button"
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Specifications
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List> */}
            </div>
            <div className="vendor-product-categories">
              <p className="add-product-header">Princing and Stock</p>
              <div className="product-main-description">
                <div className="product-main-details">
                  <Form.Item
                    name={["product", "product_price"]}
                    label="Price per Unit(USD)"
                    rules={[
                      {
                        required: true,
                        message: "price is required!",
                      },
                    ]}
                  >
                    <Input placeholder="price" style={{ width: 300 }} />
                  </Form.Item>
                  <Form.Item name={["product", "stock"]} label="Stock">
                    <InputNumber style={{ width: 300 }} />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className="drag-drop">
            <Form.Item label="Product Image">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger
                  name="files"
                  beforeUpload={(file)=> {
                    return false
                  }}
                  style={{ height: 500 }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p>Drag and Drop images/videos to upload</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </div>
          <div className="add-product-control-button">
            <Form.Item>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
              >
                Discard
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                className="save-changes-button"
                type="primary"
                htmlType="submit"
              >
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddProductsForm
