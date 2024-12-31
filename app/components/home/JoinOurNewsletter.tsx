import React from "react";
import { Box, Button, Checkbox, Text, TextInput, Title } from "@mantine/core";
import Image from "next/image";

export default function JoinOurNewsletter() {
  return (
    <Box className="w-full max-h-max flex justify-between  items-end mt-4">
      <Box className="flex flex-col justify-between w-[calc(50%-25px)] gap-y-5">
        <Title>Join Our Newsletter</Title>
        <Box className="flex flex-col gap-y-5 w-full p-4 bg-[#1E1E1E]">
          <Text>
            Potter ipsum wand elf parchment wingardium. Trace side phials treats
            powder knight-bus woes.
          </Text>
          <TextInput label="Email" placeholder="Email" />
          <Checkbox
            color="#DD6224"
            defaultChecked
            label="I agree to the Terms of Service and Privacy Policy."
          />
          <Button color="#DD6224" variant="filled">
            Submit
          </Button>
        </Box>
      </Box>
      <Box className="h-[calc(16rem+12px)] w-[calc(50%-25px)] flex items-end">
        <Box className="flex justify-center  relative bg-[#1E1E1E] h-1/2 w-full rounded-t-sm mt-auto">
          <Box className="absolute bottom-3 h-64 w-[calc(100%-24px)]  ">
            <Image
              src="https://images.unsplash.com/photo-1512236258305-32fb110fdb01?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="about us"
              fill
              className="rounded-t-sm"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
