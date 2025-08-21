import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'

export const assets = {
    logo,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon
}

export const stepsData =[
  {
    title: 'Choose Your Tool',
    description: 'Select whether you want to generate images, remove backgrounds, or upscale photos — all in one place.',
    icon: step_icon_1,
  },
  {
    title: 'Let AI Do the Work',
    description: 'Our AI instantly transforms your input — creating visuals, cleaning up backgrounds, or enhancing quality with just one click.',
    icon: step_icon_2,
  },
  {
    title: 'Download & Share',
    description: 'Get your final result in seconds, ready to use for social media, design projects, or personal use.',
    icon: step_icon_3,
  },
]


export const testimonialsData = [
    {
        image:profile_img_1,
        name:'Donald Jackman',
        role:'Graphic Designer',
        stars:5,
        text:`I’ve been using the image upscaler for nearly two years, mainly for my Instagram content, and it’s been a game-changer. The tool is super easy to use and has made my workflow so much smoother by instantly enhancing image quality without any hassle.`
    },
    {
        image:profile_img_2,
        name:'Richard Nelson',
        role:'Content Creator',
        stars:5,
        text:`I’ve been using the text-to-image feature for nearly two years, mainly to create content for Instagram, and it has been incredibly user-friendly. Turning ideas into visuals has never been easier, and it has made my creative process so much smoother.`
    },
    {
        image:profile_img_1,
        name:'Donald Jackman',
        role:' Graphic Designer',
        stars:5,
        text:`I’ve been using the background removal tool for my Instagram content, and it’s been a lifesaver. With just one click, I can get clean, professional-looking images without spending hours editing. It’s simple, fast, and makes my posts stand out.`
    },
]

export const plans = [
    {
      id: 'Basic',
      price: 499,
      credits: 50,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 1999,
      credits: 300,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 4999,
      credits: 1000,
      desc: 'Best for enterprise use.'
    },
  ]