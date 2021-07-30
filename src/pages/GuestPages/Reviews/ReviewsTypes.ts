export type TReviewData = {
  pk: string
  video_link: string
  mobile_image_url: string
  desktop_image_url: string
  title: string
  preview: string
  type: string
  initial_payment: string
  monthly_payment: string
  commission: string
  body: string
}

export type TReviews = {
  showModal: (val: string) => void
  handleSelect: (value: number | string) => void
  reviewsFilter: TReviewData[]
}
