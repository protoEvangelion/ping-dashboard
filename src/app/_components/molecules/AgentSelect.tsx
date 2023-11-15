"use client";

import React from "react";
import Select from "react-select";
import { useController, useFormContext } from "react-hook-form";
import { agentsData } from "~/data/agents-example";

const mappedAgents = agentsData.map((agent) => ({
  value: agent.id,
  label: agent.name,
}));

export function AgentSelect() {
  const { control } = useFormContext();

  const {
    field: { ref, ...inputProps },
  } = useController({
    name: "agent",
    control,
    rules: { required: true },
  });

  return (
    <Select
      {...inputProps}
      ref={ref}
      instanceId="agent-select"
      options={mappedAgents}
      placeholder="Select an agent"
      className="my-react-select-container"
      classNamePrefix="my-react-select"
    />
  );
}
