import React, { Component } from 'react'
import '../App.css'
import Nav from '../components/Nav'
import shuffle from 'lodash.shuffle'


class Photos extends Component {
  constructor(props) {
    super(props)

    this.getImages = this.getImages.bind(this)

    this.state = { 
      loading: true, 
      imgList: [],
      //Full image will display when this string isn't empty
      fullImgURL: ''
    }

  }

  componentWillMount(){
    const {params} = this.props.match
    params.initialSearch ? this.getImages('search' + params.initialSearch) : this.getImages('searchStreet')
  }

  componentWillReceiveProps(nextProps){
    const {params} = this.props.match
    if (nextProps.match.params.initialSearch !== params.initialSearch) {
      this.getImages('search' + nextProps.match.params.initialSearch)
      this.setState({fullImgURL:''})
    }
  }

  getImages(api){
    this.setState({ loading: true });
    fetch('/.netlify/functions/' + api)
      .then(response => response.json())
      .then(json => this.setState({loading: false, imgList: shuffle(json.resources)}))
  }

  //Switch from listImages div to fullImage div
  setFullImgURL(URL){
    this.setState({fullImgURL: URL})
  }

  renderImages(){
    const {imgList, fullImgURL} = this.state

    //URL is changed to grab a smaller version of image instead of the full size.
    const sizedList = imgList.map((obj, i) => <img
        data-url={imgList[i].secure_url}
        onClick={(e) => this.setFullImgURL(e.target.dataset.url)}
        style={fullImgURL.length > 0 ? {display:'none'} : {display:'block'}}
        src={imgList[i].secure_url.replace('/upload/', '/upload/w_800/')}
        key={imgList[i].public_id + 'galleryList'}
        className='galleryImg'
        alt='Photograph'
      ></img>
    )
    //Images are returned in two divs so they can be made into columns on larger screens
    const halfLength = Math.ceil(sizedList.length / 2); 
    const firstHalf = sizedList.slice(0, halfLength)
    const secondHalf = sizedList.slice(halfLength)
    return (
      <React.Fragment>
        <div>
          {firstHalf}
        </div>
        <div>
          {secondHalf}
        </div>
      </React.Fragment>
    )
  }
  
  render() {
    const {loading, fullImgURL} = this.state
    return (
      <div className="photos page">
        <Nav></Nav>
        <main className='galleryMain'>
          <div className='listImages'>
            {loading ? <p>Loading</p> : this.renderImages()}
          </div>
          <div 
            className='fullImage'
            style={fullImgURL.length === 0 ? {display:'none'} : {display:'grid'}}
          >
            <img 
              src={fullImgURL.replace('/upload/', '/upload/w_1600/')} 
              onClick={() => this.setFullImgURL('')} className='fullImg' 
            >
            </img>
          </div>
        </main>
      </div>
    );
  }
}

export default Photos
