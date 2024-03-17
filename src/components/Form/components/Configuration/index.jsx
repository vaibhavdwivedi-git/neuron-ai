import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import textStyles from "@/styles/Typography.module.css";
import { Selector } from "@/reusables";

import { useCreateForm } from "@/hooks/useCreateForm";

const Configuration = () => {
  const { form, setForm } = useCreateForm();

  return (
    <div className={styles["container"]}>
      <p className={textStyles["headline-small-bold"]}>Select Configuration</p>

      <div className={styles["field"]}>
        <p className={`${styles["label"]} ${textStyles["body-large-bold"]}`}>
          Duration
        </p>
        <Selector
          variant="single"
          name="duration"
          placeholder="Select time duration"
          state={form.duration.error ? "error" : "enabled"}
          selected={form.duration.value}
          list={["0-10 mins", "10-20 mins", "20-30 mins"]}
          handleSelectMenuItem={(item) => {
            setForm({
              ...form,
              duration: { ...form["duration"], value: item },
            });
          }}
          menuHeight="150px"
          width="605px"
          id="typeMenu"
        />
      </div>

      <div className={styles["field"]}>
        <p className={`${styles["label"]} ${textStyles["body-large-bold"]}`}>
          Channel
        </p>
        <Selector
          variant="single"
          name="channel"
          placeholder="Select channel"
          state={form.channel.error ? "error" : "enabled"}
          selected={form.channel.value}
          list={["EUT_1", "EUT_2", "EUT_3", "STL_1", "STL_10", "STL_11"]}
          handleSelectMenuItem={(item) => {
            setForm({
              ...form,
              channel: { ...form["channel"], value: item },
            });
          }}
          menuHeight="150px"
          width="605px"
          id="tagMenu"
        />
      </div>

      <div className={styles["field"]}>
        <p className={`${styles["label"]} ${textStyles["body-large-bold"]}`}>
          Select Metrics
        </p>
        <Selector
          variant="single"
          name="metrics"
          placeholder="Select metrics"
          state={form.metrics.error ? "error" : "enabled"}
          selected={form.metrics.value}
          list={[
            "tx_estimated_bw_kbps",
            "rx_estimated_bw_kbps",
            "wan_circuit_tx_cir_kbps",
            "wan_circuit_rx_cir_kbps",
            "tx_kbps",
            "rx_kbps",
          ]}
          handleSelectMenuItem={(item) => {
            setForm({
              ...form,
              metrics: { ...form["metrics"], value: item },
            });
          }}
          menuHeight="150px"
          width="605px"
          id="tagMenu"
        />
      </div>
    </div>
  );
};

export default Configuration;
