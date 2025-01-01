import { Box, Container } from "@mantine/core";
import Image from "next/image";
import React from "react";
import logoWhite from "../../public/logo-white.png";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <Box className="w-full h-20 bg-[#285F98] dark:bg-[#1E1E1E]  mt-16">
      <Container className="h-full flex justify-between items-center px-10">
        <Image alt="logo" src={logoWhite} width={120} height={120} />
        <Box className="flex gap-4">
          <FaGithub />
          <FaInstagram />
          <FaLinkedinIn />
        </Box>
      </Container>
    </Box>
  );
}
