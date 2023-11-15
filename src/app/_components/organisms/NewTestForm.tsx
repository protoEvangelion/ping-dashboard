"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgentSelect } from "../molecules/AgentSelect";
// import { PingTest } from "~/data/rows";
import { FiPlusCircle } from "react-icons/fi";
import { Input } from "../atoms/Input";

const schema = z.object({
  description: z.string().nonempty(),
  agent: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .required(),
  destIp: z.string().nonempty(),
});

export type NewTestFormValue = z.infer<typeof schema>;

export const NewTestForm = ({ addRow }: { addRow: (row) => void }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const methods = useForm<NewTestFormValue>({
    resolver: zodResolver(schema),
  });

  const onSubmit = methods.handleSubmit(({ agent, ...data }) => {
    const newRow = {
      id: Math.random().toString(36).substring(7),
      agent: agent.value,
      ...data,
    };
    addRow({ ...newRow, status: "Not Ran" });
    onClose();
    methods.reset();
  });

  return (
    <FormProvider {...methods}>
      <Button
        variant="solid"
        color="primary"
        endContent={<FiPlusCircle />}
        onPress={onOpen}
        className="mx-4"
      >
        Add New Test
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="dark"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New Test</ModalHeader>

              <form onSubmit={onSubmit}>
                <ModalBody>
                  <Input label="description" required />
                  <Input label="destIp" required />
                  <AgentSelect />
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary">
                    Add
                  </Button>
                  <Button
                    variant="solid"
                    color="secondary"
                    onPress={() => {
                      onClose();
                      methods.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </FormProvider>
  );
};
