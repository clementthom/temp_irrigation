import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteodataComponent } from './meteodata.component';

describe('MeteodataComponent', () => {
  let component: MeteodataComponent;
  let fixture: ComponentFixture<MeteodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteodataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
