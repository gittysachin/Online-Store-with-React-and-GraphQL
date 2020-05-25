import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from '../components/Header';
import Meta from '../components/Meta';

// tag template literal using back ticks 

const theme = {
    red: '#FF0000',
    black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
    maxWidth: '1000px',
    bs: '0 12px  24px 0 rgba(0, 0, 0, 0.09)'
};

theme.lightGrey = theme.lightgrey;

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2') format(woff2);
        font-weight: normal;
        font-style: normal;
    }
    html {
        font-size: 10px;
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        font-family: 'radnika_next';
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
`;

// const MyButton = styled.button`
//     background: red;
//     font-size: ${props => (props.huge ? '100px' : '50px')};
//     .smiley {
//         font-size: 100px;
//     }
// `;

class Page extends Component {
    render () {
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <GlobalStyle />
                    <StyledPage>
                        <Meta />
                        <Header />
                        <Inner>
                            {this.props.children}
                        </Inner>
                        {/* <MyButton huge="100">
                            Click Me
                            <span>😀</span>
                        </MyButton>
                        <Header />
                        <MyButton>
                            Click Me
                            <span className="smiley">😀</span>
                        </MyButton> */}
                    </StyledPage>
                </React.Fragment>
            </ThemeProvider>
        );
    }
}

export default Page;