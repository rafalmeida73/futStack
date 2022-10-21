import { render, screen } from '@testing-library/react'
import React, { useState } from 'react';
import ImageInput from '../../components/ImageInput';
global.M = require('materialize-css');

describe('ImageInput component', () => {
  it('renders correctly', () => {
    const myInitialState = {} as React.Dispatch<React.SetStateAction<File>>;

    React.useState = jest.fn().mockReturnValue([myInitialState, {}])
    render(
      <ImageInput setImage={myInitialState} defaultImage={'/profileDefault.png'} />,
    );

    expect(screen.getByAltText('editar avatar')).toBeInTheDocument();
  });
})