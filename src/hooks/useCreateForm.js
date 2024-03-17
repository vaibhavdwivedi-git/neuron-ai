import { createContext, useContext, useState } from "react";

import { data } from "@/data";
import { filterDataByChannelId } from "@/utils";
import { useRouter } from "next/router";



const CreateFormContext = createContext();

export const useCreateForm = () => {
  const context = useContext(CreateFormContext);

  

  if (!context) {
    throw new Error(
      "useCreateForm must be used within a CreateFormProvider"
    );
  }

  return context;
};

export const CreateFormProvider = ({ children }) => {

  const [form, setForm] = useState({
    duration: { value: "", error: false, supporting: "" },
    channel: { value: "", error: false, supporting: "" },
    metrics: { value: "", error: false, supporting: "" },
    label: { value: "", error: false, supporting: "" },
    current: 0,
  });

  const [metrics, setMetrics] = useState(data);

  const [output,setOutput] = useState({});

  const router = useRouter();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: {
        ...prevForm[name],
        value: value,
      },
    }));
  };

  const generateOutput = () => {
    const res = {
      channel: form.channel.value,
      metrics: [{
        "metric_name": form.metrics.value,
        "tag": form.label.value,
        "from_timestamp": data[0]["ec_timestamp"],
        "to_timestamp": data[data.length-1]["ec_timestamp"],
      },
      ],
    }
    setOutput(res);
  }


  const actions = [
    {
      back: () => {
        router.push("/");
      },
      next: () => {
          const res = filterDataByChannelId(data, form.channel.value);
          console.log(res);
          setMetrics(res)
          setForm({ ...form, current: 1 });
      },
    },
    {
      back: () => {
        setForm({ ...form, current: 0 });
      },
      next: () => {
        generateOutput();
        setForm({ ...form, current: 2 });
    },
    },
    {
      back: () => {
        setForm({ ...form, current: 1 });
      },
      next: () => {
        router.push("/");
    },
    },
  ];
  

  return (
    <CreateFormContext.Provider
      value={{
        actions,
        form,
        metrics,
        output,
        handleChange, 
        setForm,
      }}
    >
      {children}
    </CreateFormContext.Provider>
  );
};
