"use client";

import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { useCreateServiceMutation } from "@/redux/api/service/serviceApi";
import { SERVICE_TYPE } from "@/redux/api/service/type";
import ImageUpload from "@/app/components/shared/image/ImageUpload";

interface FormData {
  [key: string]: string | Date | File | null;
}

export default function CreateServiceForm() {
  const [selectedService, setSelectedService] = useState<string>("flight");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    from: "",
    to: "",
    startDate: new Date(),
    price: "",
    capacity: "",
    location: "",
    time: "00:00",
    description: "",
    country: "",
    image: null,
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [createService,{data,isLoading,isSuccess,error}] = useCreateServiceMutation()
  console.log({data,isLoading,isSuccess,error})

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    setFormData({
      name: "",
      from: "",
      to: "",
      startDate: new Date(),
      price: "",
      capacity: "",
      location: "",
      time: "00:00",
      description: "",
      country: "",
      image: null,
    });
    setUploadedImage(null);
  };

  const handleFormChange = (field: string, value: string | Date) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     setFormData({ ...formData, image: file });
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = () => {
    console.log("Selected Service:", selectedService);
    console.log("Form Datam:", {service:selectedService,...formData});

    createService({
      service: selectedService as SERVICE_TYPE,
      ...formData,
    })

    setSelectedService("flight");
    // setFormData({
    //   name: "",
    //   from: "",
    //   to: "",
    //   startDate: new Date(),
    //   price: "",
    //   capacity: "",
    //   location: "",
    //   time: "00:00",
    //   description: "",
    //   country: "",
    //   image: null,
    // });
    setUploadedImage(null);
  };

  return (
    <div>
      <p className="pb-8 font-bold font-2xl">Create Service</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormControl>
          <InputLabel id="service-label">Service</InputLabel>
          <Select
            labelId="service-label"
            id="service-select"
            value={selectedService}
            label="Service"
            onChange={(e) => handleServiceChange(e.target.value as string)}
          >
            <MenuItem value="flight">Flight</MenuItem>
            <MenuItem value="hotel">Hotel</MenuItem>
            <MenuItem value="holiday-package">Holiday Package</MenuItem>
            <MenuItem value="bus">Bus</MenuItem>
            <MenuItem value="train">Train</MenuItem>
            <MenuItem value="cab">Cab</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
        />

        <TextField
          name="from"
          label="From"
          value={formData.from}
          onChange={(e) => handleFormChange("from", e.target.value)}
        />

        <TextField
          name="to"
          label="To"
          value={formData.to}
          onChange={(e) => handleFormChange("to", e.target.value)}
        />

        <TextField
          name="startDate"
          label="Start Date"
          autoFocus
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            handleFormChange("startDate",e.target.value)
          }
        />

        <TextField
          name="price"
          label="Price"
          value={formData.price}
          onChange={(e) => handleFormChange("price", e.target.value)}
        />

        <TextField
          name="capacity"
          label="Capacity"
          value={formData.capacity}
          onChange={(e) => handleFormChange("capacity", e.target.value)}
        />

        <TextField
          name="location"
          label="Location"
          value={formData.location}
          onChange={(e) => handleFormChange("location", e.target.value)}
        />

        <TextField
          name="time"
          label="Time"
          type="time"
          value={formData.time}
          onChange={(e) =>
            handleFormChange("time", e.target.value)
          }
        />
        <TextField
          name="country"
          label="Country"
          value={formData.country}
          onChange={(e) => handleFormChange("country", e.target.value)}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={6}
          value={formData.description}
          onChange={(e) => handleFormChange("description", e.target.value)}
        />

        <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage}/>

      </div>
      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{
          paddingY: "15px",
          backgroundColor: "var(--color-primary) !important",
          marginTop: "20px",
        }}
      >
        Create Service
      </Button>
    </div>
  );
}
