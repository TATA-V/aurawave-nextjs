'use client';
import React from 'react';
import styled from 'styled-components';

export const generateStaticParams = async () => {
  return [{ name: 'test' }];
};

interface Props {
  params: { name: string };
}

function Test({ params }: Props) {
  const { name } = params;
  return <StyledP>{name}</StyledP>;
}

export default Test;

const StyledP = styled.p`
  color: pink;
`;
