<template>
  <div>
    <SfHeading
      title="2. Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        v-model="firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        required
      />
      <SfInput
        v-model="apartment"
        label="House/Apartment number"
        name="apartment"
        class="form__element"
        required
      />
      <SfInput
        v-model="city"
        label="City"
        name="city"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="state"
        label="State/Province"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="zipCode"
        label="Zip-code"
        name="zipCode"
        class="form__element form__element--half"
        required
      />
      <SfSelect
        v-model="country"
        label="Country"
        class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
        required
      >
        <SfSelectOption
          v-for="countryOption in countries"
          :key="countryOption"
          :value="countryOption"
        >
          {{ countryOption }}
        </SfSelectOption>
      </SfSelect>
      <SfInput
        v-model="phoneNumber"
        label="Phone number"
        name="phone"
        class="form__element"
        required
      />
    </div>
    <SfHeading
      title="Shipping method"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__radio-group">
        <SfRadio
          v-for="item in shippingMethods"
          :key="item.value"
          v-model="shippingMethod"
          :label="item.label"
          :value="item.value"
          name="shippingMethod"
          :description="item.description"
          class="form__radio shipping"
        >
          <template #label="{label}">
            <div class="sf-radio__label shipping__label">
              <div>{{ label }}</div>
              <div>{{ item.price }}</div>
            </div>
          </template>
          <template #description="{description}">
            <div class="sf-radio__description shipping__description">
              <div class="shipping__delivery">
                {{ item.delivery }}
                <SfButton
                  class="sf-button--text color-secondary shipping__action"
                  :class="{ 'shipping__action--is-active': item.isOpen }"
                  @click="item.isOpen = !item.isOpen"
                  >info
                </SfButton>
              </div>
              <transition name="fade">
                <div v-if="item.isOpen" class="shipping__info">
                  {{ description }}
                </div>
              </transition>
            </div>
          </template>
        </SfRadio>
      </div>
      <div class="form__action">
        <SfButton
          class="sf-button--full-width form__action-button"
          @click="toPayment"
          >Continue to payment
        </SfButton>
        <SfButton
          class="sf-button--full-width sf-button--text color-secondary form__action-button form__action-button--secondary"
          @click="$emit('click:back')"
          >Go back to Personal details
        </SfButton>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio
} from "@storefront-ui/vue";

export default {
  name: "Shipping",
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    shippingMethods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      streetName: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      shippingMethod: "",
      countries: [
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia and Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kosovo",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "The Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City"
      ]
    };
  },
  watch: {
    order: {
      handler(value) {
        this.firstName = value.shipping.firstName;
        this.lastName = value.shipping.lastName;
        this.streetName = value.shipping.streetName;
        this.apartment = value.shipping.apartment;
        this.city = value.shipping.city;
        this.state = value.shipping.state;
        this.zipCode = value.shipping.zipCode;
        this.country = value.shipping.country;
        this.phoneNumber = value.shipping.phoneNumber;
        this.shippingMethod = value.shipping.shippingMethod;
      },
      immediate: true
    }
  },
  methods: {
    toPayment() {
      const order = { ...this.order };
      const shipping = { ...order.shipping };
      shipping.firstName = this.firstName;
      shipping.lastName = this.lastName;
      shipping.streetName = this.streetName;
      shipping.apartment = this.apartment;
      shipping.city = this.city;
      shipping.state = this.state;
      shipping.zipCode = this.zipCode;
      shipping.country = this.country;
      shipping.phoneNumber = this.phoneNumber;
      shipping.shippingMethod = this.shippingMethod;
      order.shipping = shipping;
      this.$emit("update:order", order);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.title {
  margin: 0 0 var(--spacer-extra-big);
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-extra-big) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-extra-big);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      margin: var(--spacer-big) 0;
      @include for-desktop {
        order: -1;
        --button-margin: 0;
        text-align: left;
      }
    }
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__radio-group {
    flex: 0 0 100%;
    margin: 0 0 var(--spacer-extra-big) 0;
  }
}
.shipping {
  margin: 0 calc(var(--spacer-big) * -1);
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-size-extra-small);
  }
  &__delivery {
    color: var(--c-text-muted);
  }
  &__action {
    margin: 0 0 0 var(--spacer);
    &::before {
      content: "+";
    }
    &--is-active {
      --button-color: var(--c-primary);
      --button-transition: color 150ms linear;
      &::before {
        content: "-";
      }
    }
  }
}
</style>
