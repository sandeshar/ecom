export type Highlight = {
    id: string;
    title: string;
    description: string;
    image: string;
};

export type Product = {
    id: string;
    title: string;
    description: string;
    image: string;
};

export type Category = {
    id: string;
    name: string;
    image: string;
};

export type Testimonial = {
    id: string;
    name: string;
    quote: string;
    rating: number;
    avatar: string;
};

export const featuredHighlights: Highlight[] = [
    {
        id: "abstract-art",
        title: "Abstract Art Collection",
        description: "Explore our latest abstract art pieces.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCafYBLS5HaFGDb4ZWM-80G4ZTTGFmPKH5NAcBB8CMsLyuhUyEK1eXBQZZZsOuQXWiaTlZ2O8oSHiyNKWXWfX8kiwrSicPj1Rq6ShhPm7W2Fh5w3axNFDlYIkVR2x8pm0e163ZaYwBQyxSdK2JGK4XiS8hJGvPrOxlBItPdFGUx8DW7pC_zx7wqUj9lbK5N9GX7PL9BC-3Ju472HOrMJVZQ8G8_US1p_C3bDU9YLLGBHvHntYKRRJ1N05gqyCGQYnDogPAfV5Q2Mes",
    },
    {
        id: "geometric-patterns",
        title: "Geometric Patterns",
        description: "Discover unique geometric patterns for your projects.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCqAVaNGmbba0hcutGs5rZriEyo1A9UMUBJ3sizOr6Ho-5FhlS7SSLLF2I-riKJbDOOQjFf__QWDM_Gi2b_7xpxbhpaEnlJBfeCfIdl0TUGemf41jpjEKpsVnkgEqZ03hWqb_3Ayn6LfOPjQARoHO-3DtqH9kem3QpDGuEX-2tCmG29o2n6hDMBj-TimLBZz9uMfjhzbr4c9mtMmmq0c2oFTD1ialFWyerQQb9eAM7Gis3T6fwZlyYeMgYcg9ujFG2oxa34OTBI6hA",
    },
    {
        id: "modern-illustrations",
        title: "Modern Illustrations",
        description: "Browse through our collection of modern illustrations.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB_6OOMPMEKQnfHyf5D-7y9uWkxrONdTKaa4pqYL_4fPNLkO9eB8m1kzVthVFULnpjgnakhlXEMhskwVanNT7zvFbdokXc0KFaZxShCic_FXcrrx8yuaFgkEO_eLd2be1I-wqHaJr4vh_Q74ZRQXPdY1QHNCEGhup10JoSpC1TWfFnoLlP9mMJtfUQGLVuwkG8nKzoDwLxNnsIudJQ1euPWpuaWTM2KsR0806gLZ14t3gYArw4UEC_peVxCCLZt9ivBqf29q4Cadks",
    },
    {
        id: "minimalist-designs",
        title: "Minimalist Designs",
        description: "Find minimalist designs for a clean and elegant look.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCtqT6cx71AFcn1wzcuezD3po0QNl1l8hzn87N7YzdO7SAEIe7RuivhrLmxWzzeaTn_QZNea5_4_9SP8-C1shYM4TC1H2_mDzQkvdzLGDLks-pmvJ2WcfbKwFdtKLOr2dJtR0E8_5Foh3tlt4Bfy2neE0wEsPIlMjYdjiURdckhobKmT4_qwikKkj-PpECa59xpoZ5IWfIrwfVVXdKMlogQj2QGj_qyKmXIiEbd8TlKBeHrZiFHuu8kV5SdKR60fB7Erw8JtPmeQ1M",
    },
];

export const newArrivals: Product[] = [
    {
        id: "modern-art-print",
        title: "Modern Art Print",
        description: "A vibrant art print for your home.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB2dPTzaG2kOHQ9elG-QV4-MAxFrhuUpYhuAqW3HmeP8xIvIHKifK6myRXAJ16O0AT2_k2dUyn7oRsQkEYoKiZU37_twIcuAVYewO6Nbz5N0jflXWZkaYHacloeQ5KAdXRZbIcvcyvS1qTBPUOkgCb5ZfFTgFdSM2M7dXQY_3_kMOVJmvxKRYbg_9E6hj6Wy8n2LBlg11zUg49O3JjwMlJ4FWEymgJcaNClhsRwHve_elURAUP_eEMH_YCbwUWRLUGfwPnymOOjrMA",
    },
    {
        id: "abstract-pattern-design",
        title: "Abstract Pattern Design",
        description: "A unique pattern design for various applications.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDM9vzD1sOhweDwTrl8sSAJV_W01sVCgvfskAb8XscHrI_zP8RPiwBHir0bzGBxwIhARNk7Y9OMf5WtTerNDgUOeovQB9-3AnbwvZx8C0h-jNSBxnMwXYEHXuUygbYZyVPYjD22EDZ8PbmP3XJjkqz_8sE1llR8a6t2kUxyw1qUiX3PNq_MbKLxol5bG7GwYq9rf6yIHRTPS5Yund_FRgNvwZMGL5AAQWN9IrNAKxiW5XYprg-X-3BAj6CJZziUf1GEXkWg28g70DM",
    },
    {
        id: "geometric-illustration",
        title: "Geometric Illustration",
        description: "A stylish geometric illustration.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCxvR3YCjCP9SAH901g0xxKSPEMmVIkG7yrAtrVPjDubW3WJJxMynDoYsfrMYwRxZu4C0oWHjQ9YVdI5mv7Jl70n3CH4xsgvPMf3G8nA42noK0iTU9okP_PJpBZSFr0LjqUxUbqUA9uscVfcrLq5Oo3QdjpWrWm_ArhZVX40f5bhAg3GmpASJdQecc7HALjuf4aFc8zBtIU4_3CiZJeMN5C5s8qqZJwTe5EKNGYHpDT_9IHpjVhetAqPb3pHvJnmQxkqZ0zmgsjroQ",
    },
    {
        id: "minimalist-poster",
        title: "Minimalist Poster",
        description: "A minimalist poster with a modern touch.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAhZo_7StqTqtgFVogoe8Ouxh2JeP85EICkKd9s3z0tJhUxPUheopUB3brwwrarkJrhTA-gcLssbgZsU0gYEXqdF40R6PA3xTPgMnU5P3kTwkF-MkbMqz9WaUXmP2UssK1JofyDn_76zVk7_JDvekMbKO1jdXag0b9y33syVyJPq81D8HdgsD58WjU_WnR2KZS7UJPhD4TcUNrE8t5UqFLMX0pIXOdjFAfGQ5Q0fs7kI_CTnZZdDXot-dmfs3Kh7z_RYJHSXJMMqF8",
    },
];

export const categoryFilters = [
    "Abstract",
    "Geometric",
    "Minimalist",
    "Illustrations",
    "Patterns",
    "Prints",
];

export const popularCategories: Category[] = [
    {
        id: "abstract-art",
        name: "Abstract Art",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB6jSd41n9RIa_eH1P20BuLP31mHhzDpO910XewlH6DQvqv0FDt7z0nCTLIsK1B4fA9797mgORfAtL3oHUjneNP6dFJFXOsCYp4Cbq3imJqh9Rwv5GcOTZSWO-UZEg9_rn-QGzjENKMAjE23SXxMDUhonxzIVV82BTFETywg0HKg4Wew_xBf8n2NgZDFLNuEN-1gYpYK6zJatEvHn6iwEcqaKVmVdNTI4sHVqCbk6x0F3IzkZneDaDpP3p-jRHouVHTu_2FeKoVrNI",
    },
    {
        id: "geometric-patterns",
        name: "Geometric Patterns",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAD2vs-jWyAvJ83E6gLm6hYUV7EIb8lQOLDaQZ-2jAMzyG3mlSyaZn-QBBv3LS25YTHdJeH9blLEQh99v5X3BxFdZBcoTLPSVlFTdGtRBmLoAslTupv0iJ1nyL9pnBkXal5fLl4goqQKSKJ_XiSs8mNkU5A47BCLTHyPBzeOeqZ5HwxG_Wuome1ShTIBdY_w10cjK9Epa65PuQgkZ73aZDQnVg_6UoSy_btl47DNnNXdf7NeRFAT9bbAOGZvlVUyeFLlswbeVbhG1M",
    },
    {
        id: "minimalist-designs",
        name: "Minimalist Designs",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDYaWJberomVfhY8fChx3mIbsrkK4ydu5GdNGtoQ0HoqazOTfnaktBh5N8vmPAarkQJC8E-PNn6K4zujepaARRj3tM51JSjEptI3jGPf6VehUgwBJyb1CsYOoN2TRWuJ5LvVxG3Luj5BVmKE6ShuAtSgnA8MEnXFpOtkAcQhQhjdtvtu1zBs7cBtN5be91bjH96IC1g3k22zukz157344CDDm8Ciih3kMypLRek4g5wlFCJruSQDr_lyYpoEWdSc9ZZMX1OiIYu5Ac",
    },
    {
        id: "illustrations",
        name: "Illustrations",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCqlMJPwUZtU7OeMM3BVfcuoRBOTRmA-3qFyZOrMgTGvUJ3f0JnOWqH8oUe44bXCeygE6tAPA3TYZkMKOYu0RXtUUXoE8usbCvJ2BRr4LUwnsXiR27oLOUcOZPPhx7tvgyl25ONr_lb_5r2LSj_HnZ2cBq7n5s2gFdSB9kjLJ844Ad2SXYHhbcSTz1_FHu5p1y1oSqWuJIJ3_YH2gmsVexLLMncUtv-gX9EK4DZqIEUHTe8dGmRQleIhW2o8QWxFUOTSPeKO5WWWhk",
    },
    {
        id: "patterns",
        name: "Patterns",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAQQkLu43Et-D1v_bbCyCIExNYEPYp9JS9dCGD-W3kEhfo53yGYpjQM9RPuxriRjQpvyCysRBVoVUCCTa7ncjvQtKqxcIR20Nk1YEEvtRDT6qMGEwdLffhHWG2qfYhHUV9EtjUcVemXsmEjfXK94eRTLsmSdG9v9YQUV4ziFK3TzlMkiFJNk9xLQ6r4EmyKiu-jTL-3r0XlO8WFBp0IsnfZeX1_T7qOVL5cLGABIl3m_UnKXotpV-Z4TacbCuRfEnJIS2GD0lb7X6s",
    },
    {
        id: "prints",
        name: "Prints",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBYKMXI8YP0qev9Jprh3cXRBJzciM4wLvy511fL4xusGYzyH4zMx7Km5x81pTrmjtK1s1BXOZ2c4tgPKdcjIdw4Sl0edl4M-XL49zOxzXGr-vCDQpx0VwHUvOpPHqgCcTYvK8MbfG8TEsjnQooIBooODD-PzhfC7snw5Y9HA8uBdZnH62dd1nWC-IuuRXT56_znhQMCgMTz5tceBiEuMO5S-VQ-LBG9r_qnvWDYdroXU44G3xCAvHfHY8at0lee0HBGGGy0iv_Mols",
    },
];

export const testimonials: Testimonial[] = [
    {
        id: "sarah-johnson",
        name: "Sarah Johnson",
        rating: 5,
        quote:
            "The quality of the designs is exceptional. I found the perfect assets for my new project, and the process was seamless. Highly recommended!",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDSjWgXuzpTMYULFkCw1A6-k0yeY0dX3AqBROP873s12kKog4-HPog9Fd6niPIP7boZ0K-2EqOiqc3FcsQM-G5YVphCKzlLg60glkzviQ64Azja69hDZbSfvxelcYm0QpmW0JF-CJzn0kXY1UheYEZUGhG05Dlojq-9528gU5YLigIiCQLSK3HHQ9gCHmmJ4M0Iq0Lt82e-qOBGTlh2moVxEbyL1OuLF5O6TbsQlk7wcB-SlAJIG1dihBY6-q3Ho7GnwHbrXRv5fUM",
    },
    {
        id: "michael-chen",
        name: "Michael Chen",
        rating: 4.5,
        quote:
            "A fantastic marketplace for designers. The variety of styles is impressive, and I love discovering new artists and their work. Will definitely be back for more.",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBSwAA8BExXQ-r-9SeWaNpJG9ObC8Q4EviLOwbcP9VxeHxnLcPgkGutO6_l-MB_Qp_Z_GbkyNJdtLU7fL_IxBlHjIEzJos1kDdnkWssIihohXow2GmbuP4rV7-kkCn01FV7RWGoAc87RcHKCLev6O9dCJRT218BkPiz7h7U6mFliXWf-C33DrFUMruuaxVSR2oMDKy0v9oeVO6_avcCnM5y2ojucr1vlaUfzqH1CqLbUJsabuVoH6-wuWC1A8i2K03cuEa1TP-4-hY",
    },
    {
        id: "emily-rodriguez",
        name: "Emily Rodriguez",
        rating: 5,
        quote:
            "I'm so impressed with the customer service and the beautiful designs available. It's my go-to place for unique digital art. Keep up the great work!",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuChFQJwysV2eY8Btry8sQQ3KLJKPxrVNm4ixUWh4xwTZwu9KVm3TgxB2ZYLLZ_ktGoTCl9Dc25T0pNasFNs15zldbxa5vT72tJW8XCSUVbpgfaC4HnVoE_Ko9XfdyXqJYKs7mv0hw7-05ueyhGKnKlBIQuKe1bBLuFhZJj8045lW4EMEfNcvyf_CKQSeO9VeYtfBXnt0TOEFn9lA2df4CSZ5ymsaqwQNFoXkP74gywmkC1I747ac7R2aeBTRsJqzCWTk0VFnW0AQtg",
    },
];
