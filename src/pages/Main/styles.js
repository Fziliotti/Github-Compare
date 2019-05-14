import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  img {
    @media (max-width: 768px) {
      height: 40px;
      margin: 30px 0;
    }
  }
`;

export const Form = styled.form`
  margin-top: 20px;
  width: 80%;
  max-width: 400px;
  display: flex;

  input {
    flex: 1;
    height: 55px;
    padding: 0 20px;
    background: #fff;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
    border: ${props => (props.withError ? '2px solid #f00' : 0)};

    @media (max-width: 768px) {
      width: 80%;
      padding: 0 10px;
      font-size: 16px;
    }
  }

  button {
    width: 80px;
    height: 55px;
    padding: 0 20px;
    margin-left: 10px;
    background: #389ced;
    color: #fff;
    border: 0;
    font-size: 20px;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s linear;

    @media (max-width: 768px) {
      font-size: 16px;
      width: 60px;
      margin-left: 5px;
    }

    &:hover {
      background: #52d89f;
    }
  }
`;
