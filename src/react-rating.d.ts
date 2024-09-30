// src/react-rating.d.ts
declare module 'react-rating' {
    import { Component } from 'react';
  
    interface RatingProps {
      readonly fractions?: number;
      readonly fullSymbol?: JSX.Element | string;
      readonly emptySymbol?: JSX.Element | string;
      readonly initialRating?: number;
      readonly stop?: number;
      readonly onChange?: (value: number) => void;
    }
  
    export default class RatingRating extends Component<RatingProps> {}
  }
  